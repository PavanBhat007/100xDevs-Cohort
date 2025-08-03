const express = require("express");
const userRouter = require('./user');
const accountsRouter = require('./accounts');

const app = express();
app.use(express.json());
const router = express.Router();

// /api/v1/user/... routes are handled by userRouter
router.use("/user", userRouter);

// /api/v1/accounts/... routes are handled by accountsRouter
router.use("/accounts", accountsRouter);

module.exports = router;
