const express = require("express");
const cors = require("cors");
const todoDatabase = require("./todos");

const app = express();
const PORT = 8080;
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

// function to get N random todos
function generateRandomTodos(count = 5) {
  const shuffled = [...todoDatabase].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// function to get single todo by ID
function getSingleTodo(id) {
  return todoDatabase.find((todo) => todo.id === Number(id));
}

// function to get a random integer between 1-max
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// GET /todos -> return 3 to 5 random todos
app.get("/todos", (req, res) => {
  console.log("/todos");
  const count = Math.floor(Math.random() * 3) + 3;
  const todos = generateRandomTodos(count);
  res.status(200).json({ todos: todos });
});

// GET /todo/:id -> return todo with given id
app.get("/todo", (req, res) => {
  const id = req.query.id;
  const todo = getSingleTodo(id);

  console.log("/todo?id=" + id);

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  res.status(200).json({ todo: todo });
});

// GET /notifications -> returns 4 random no:s b/w 1-200
app.get("/notifications", (req, res) => {
  console.log("/notifications");

  const network = getRandomInt(200);
  const jobs = getRandomInt(200);
  const messaging = getRandomInt(200);
  const notifications = getRandomInt(200);

  res.status(200).json({
    network,
    jobs,
    messaging,
    notifications,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
