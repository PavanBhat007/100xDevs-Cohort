const express = require("express");
const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.post("/todo", async (req, res) => {
  const payload = createTodo.safeParse(req.body);

  if (!payload.success) {
    res.status(411).json({ message: "Invalid inputs" });
    return;
  }

  // success => put in DB
  await todo.create({
    title: req.body.title,
    description: req.body.description,
    completed: false,
  });

  res.status(200).json({ message: "Todo created" });
});

app.get("/todos", async (req, res) => {
  const todos = await todo.find();
  res.status(200).json({ todos: todos });
});

app.put("/completed", async (req, res) => {
  const payload = updateTodo.safeParse(req.body);

  if (!payload.success) {
    res.status(411).json({ message: "Invalid Todo ID" });
    return;
  }

  // success => update DB entry
  await todo.updateOne(
    {
      _id: req.body.id,
    },
    {
      completed: true,
    }
  );

  res.status(200).json({ message: "Todo updated" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
