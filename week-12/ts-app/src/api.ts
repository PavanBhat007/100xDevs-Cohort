import { z } from "zod";
import express from "express";

const app = express();

const userProfileSchema = z.object({
  name: z.string().min(1, { message: "Name cannot be empty" }),
  age: z.number().min(18, { message: "You must be atleast 18 years or older" }),
  email: z.email({ message: "Invalid email" }),
});

// // repetition of types here as already sort-of defined in the zod schema
// interface FinalUserSchema {
//   name: string;
//   age: number;
//   email: string;
// }

// infers the type from the zod Schema
type FinalUserSchema = z.infer<typeof userProfileSchema>

app.put('/user', async (req, res) => {
  const { success, error } = userProfileSchema.safeParse(req.body);
  // const updateBody = req.body; // type is any

  const updateBody: FinalUserSchema = req.body;

  if(!success) {
    return res.status(411).json({ message: error })
  }

  //db logic and return
})
