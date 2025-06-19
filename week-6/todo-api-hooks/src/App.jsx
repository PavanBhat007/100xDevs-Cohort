import { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    setInterval(() => {
      fetch("http://localhost:8080/todos").then(async (res) => {
        const data = await res.json();
        setTodos(data.todos);
      });
    }, 10000);
  }, []);

  return (
    <div>
      {todos.map((todo) => {
        return (
          <Todo
            key={todo.id}
            title={todo.title}
            description={todo.description}
          />
        );
      })}
    </div>
  );
}

function Todo({ title, description }) {
  return (
    <>
      <h1>{title}</h1>
      <p>{description}</p>
    </>
  );
}

export default App;
