const express = require("express");

const app = express();
app.use(express.json());

app.get("/todos", (_, res) => {
  const todos = generateRandomTodos();
  res.json(todos);
});

app.use(function (err, req, res, next) {
  res.send(`Sorry, We ran into an issue.`);
});

app.listen(8080, () => {
  console.log("Server running on port 8080 ...");
});

function generateRandomTodos() {
  const todoData = [
    { title: "Grocery Shopping", desc: "Buy milk, eggs, and bread" },
    { title: "Dog Walk", desc: "Take the dog for a walk in the park" },
    { title: "Report Writing", desc: "Finish the quarterly sales report" },
    { title: "Call Friend", desc: "Catch up with an old friend" },
    { title: "Book Reading", desc: "Read a chapter of the new novel" },
    { title: "House Cleaning", desc: "Clean the living room and kitchen" },
    { title: "Morning Run", desc: "Go for a 5km run" },
    { title: "Learning", desc: "Study a new programming concept" },
  ];

  const numberOfTodos = Math.floor(Math.random() * 2) + 3;

  const selectedTodos = [];
  const availableTodos = [...todoData];

  for (let i = 0; i < numberOfTodos; i++) {
    if (availableTodos.length === 0) {
      break;
    }
    const randomIndex = Math.floor(Math.random() * availableTodos.length);
    const selectedTodo = availableTodos.splice(randomIndex, 1)[0];
    selectedTodos.push({
      title: selectedTodo.title,
      desc: selectedTodo.desc,
      id: i + 1,
    });
  }

  return selectedTodos;
}
