const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const jwtPassword = "123456";

mongoose.connect(
  "mongodb+srv://pvn:pvnbhat@cluster0.gxxfv.mongodb.net/user_app?retryWrites=true&w=majority&appName=Cluster0",
);

const User = mongoose.model("User", {
  name: String,
  email: String,
  password: String,
});

const app = express();
app.use(express.json());

async function userExists(email, password) {
  const user = await User.findOne({email: email});
  return user ? (user.password === password ? true : false) : false;
}

app.post("/signin", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  if (!(await userExists(email, password))) {
    return res.status(403).json({
      msg: "User not found",
    });
  }

  var token = jwt.sign({ email: email }, jwtPassword);
  return res.json({
    token,
  });
});

app.post("/signup", async (req, res) => {
  const name = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  if(await userExists(email, password)) {
    return res.json({msg: "User exists"});
  }

  const user = new User({
    name: name,
    email: email,
    password: password,
  });

  await user.save();
  res.json({msg: "User created successfully"});
});

app.get("/users", function (req, res) {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, jwtPassword);
    const email = decoded.email;
    
    const ALL_USERS = User.find({});
    const users = ALL_USERS.filter((user, _) => user.email !== email);
    return res.status(200).json({
      users,
    });
  } catch (err) {
    return res.status(403).json({
      msg: "Invalid token",
    });
  }
});

app.listen(3000, () => {
    console.log("Server running on port 3000 ...")
});