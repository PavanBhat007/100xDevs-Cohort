const mongoose = require("mongoose");
const express = require("express");

const app = express();
app.use(express.json());

mongoose.connect(
    "mongodb+srv://pvn:pvnbhat@cluster0.gxxfv.mongodb.net/user_app?retryWrites=true&w=majority&appName=Cluster0"
);

const User = mongoose.model("Users", {
  name: String,
  email: String,
  password: String,
});

app.post("/signup", async (req, res) => {
  const name = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const existingUser = await User.findOne({email: email});
  if(existingUser) {
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

app.listen(3000, () => {
  console.log("Server running on port 3000 ...");
})