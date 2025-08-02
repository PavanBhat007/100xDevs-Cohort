const express = require("express");
const authMiddleware = require("../middleware");
const { Account } = require("../db");

// /api/v1/accounts/... routes are handled here
const router = express.Router();

// authentication via authMiddleware => userId in req obj
router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({ userId: req.userId });
  res.status(200).json({ balance: account.balance });
});

// router.post("/transfer", authMiddleware, async (req, res) => {
//   const from = req.userId;
//   const { amount, to } = req.body.to;

//   const account = await Account.findOne({ userID: from });
//   if (account.balance < amount)
//     return res.status(400).json({ message: "Insufficient balance" });

//   const toAccount = await Account.findOne({ userId: to });
//   if (!toAccount)
//     return res.status(400).json({ message: "Recipient account not found" });

//   // update sender's account
//   await Account.updateOne(
//     { userId: from },
//     {
//       $inc: {
//         balance: -amount,
//       },
//     }
//   );

//   // update recipient's account
//   await Account.updateOne(
//     { userId: to },
//     {
//       $inc: {
//         balance: amount,
//       },
//     }
//   );

//   res.status(200).json({ message: "Transaction successful" });
// });

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const { amount, to } = req.body;

  const account = await Account.findOne({ userId: req.userId }).session(
    session
  );

  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({ message: "Insufficient balance" });
  }

  const toAccount = await Account.findOne({ userId: to }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({ message: "Invalid account" });
  }

  // Transfer
  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  ).session(session);

  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } }
  ).session(session);

  await session.commitTransaction();
  res.status(200).json({ message: "Transaction successful" });
});

module.exports = router;
