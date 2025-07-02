import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { filterAtom, filteredTodos, todoAtom } from "./store/atoms/todo";

function App() {
  return (
    <>
      <FilterTodos />
      <TodoRenderer />
      <TodoUpdate />
    </>
  );
}

function FilterTodos() {
  const setFilter = useSetRecoilState(filterAtom);

  return (
    <div>
      <input
        type="text"
        placeholder="Filter todos"
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
}

function TodoRenderer() {
  const todos = useRecoilValue(filteredTodos);

  return (
    <div>
      {todos.map((todo) => {
        return (
          <div key={todo.id}>
            <h2>{todo.title}</h2>
            <h6>{todo.description}</h6>
          </div>
        );
      })}
    </div>
  );
}

function TodoUpdate() {
  const setTodos = useSetRecoilState(todoAtom);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const updateTodos = () => {
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Date.now(), title, description },
    ]);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Title: "
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description: "
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={() => updateTodos()}>Add Todo</button>
    </div>
  );
}

export default App;
