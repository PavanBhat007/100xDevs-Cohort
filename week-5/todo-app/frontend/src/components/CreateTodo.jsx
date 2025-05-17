import { useState } from "react";

export function CreateTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div>
      <input
        type="text"
        placeholder="Title: "
        style={{ margin: 10, padding: 10 }}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      ></input>
      <input
        type="text"
        placeholder="Description: "
        style={{ margin: 10, padding: 10 }}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      ></input>

      <button
        style={{ margin: 10, padding: 10 }}
        onClick={() => {
          fetch("http://localhost:3000/todo", {
            method: "POST",
            body: JSON.stringify({
              title: title,
              description: description,
            }),
            headers: {
              "Content-type": "application/json",
            },
          }).then(async (res) => {
            const json = res.json();
            alert("Todo added");
          });
        }}
      >
        Add Todo
      </button>
    </div>
  );
}
