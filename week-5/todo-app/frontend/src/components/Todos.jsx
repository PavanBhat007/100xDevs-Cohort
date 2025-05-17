import { useState } from "react";

export function Todos({ todos }) {
  return (
    <div>
      {todos.map((todo) => {
        return (
          <div>
            <h1>{todo.title}</h1>
            <h2>{todo.description}</h2>
            <p>{todo._id}</p>
            <button
              onClick={() => {
                if (!todo.completed) {
                  fetch("http://localhost:3000/completed", {
                    method: "PUT",
                    body: JSON.stringify({
                      id: todo._id,
                    }),
                    headers: {
                      "Content-type": "application/json",
                    },
                  }).then(async (res) => {
                    const json = await res.json();
                    todo.completed = true;
                    alert("Completed Todo!");
                  });
                }
              }}
            >
              {todo.completed ? "Completed" : "Mark as complete"}
            </button>
          </div>
        );
      })}
    </div>
  );
}
