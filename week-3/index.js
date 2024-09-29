const express = require("express");
const z = require("zod"); // importing zod
const app = express();

function validateInput(obj) {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    country: z.literal("IN").or(z.literal("US")),
  });

  return schema.safeParse(obj);
}

app.use(express.json());

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const country = req.body.country;

  if (!validateInput({ email, password, country }).success) {
    res.send("Invalid input");
  } else {
    res.send(`Hello ${email} from ${country == "IN" ? "India" : "USA"}`);
  }
});

app.listen(3000);
