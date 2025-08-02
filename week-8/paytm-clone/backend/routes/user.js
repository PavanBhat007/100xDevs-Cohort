const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");

const { User, Account } = require("../db");
const { authMiddleware } = require("../middleware");

// /api/v1/user/... routes are handled here
const router = express.Router();
const jwtSecret = process.env.JWT_SECRET;

const signupScehma = zod.object({
  username: zod.string(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

const signinScehma = zod.object({
  username: zod.string(),
  password: zod.string(),
});

const updateScehma = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

// signup route
router.post("/signup", async (req, res) => {
  const body = req.body;
  const { success } = signupScehma.safeParse(body);

  if (!success)
    return res
      .status(411)
      .json({ message: "Email already taken / incorrect inputs" });

  const user = await User.findOne({ username: body.username });
  if (user._id) {
    return res
      .status(411)
      .json({ message: "Email already taken / incorrect inputs" });
  }

  const newUser = await User.create(body);
  
  // create an account with random balance when new User created
  await Account.create(
    newUser._id,
    1 + (Math.random() * 10000) // random balance b/w 1-10000
  );
  const token = jwt.sign({ userId: newUser._id }, jwtSecret);

  return res
    .status(200)
    .json({ message: "User created successfully", token: token });
});

// login route
router.post("/signin", (req, res) => {
  const body = req.body;
  const { success } = signinScehma.safeParse(body);
  if (!success)
    return res.status(411).json({ message: "Error while signing in" });

  const user = User.findOne({ username: body.username });
  if (!user) return res.status(411).json({ message: "Error while signing in" });

  if (user) {
    const token = jwt.sign({ userId: user._id }, jwtSecret);
    res.status(200).json({ token: token });
  }
});

// update user info
router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateScehma.safeParse(req.body);

  if (!success)
    return res.status(411).json({ message: "Error while updating!" });

  // as we are using authMiddleware to perform authentication,
  // after successfull authentication, userId is added in the req
  // which is what we can use as a confirmation that user is auth'd

  await User.updateOne(req.body, { id: req.userId });
  return res.status(200).json({ message: "Updated successfully" });
});

// URL?filter=<text>
router.get("/filter", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = router;
