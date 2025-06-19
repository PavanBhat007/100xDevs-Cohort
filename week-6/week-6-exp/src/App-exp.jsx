import { useState, memo } from "react";
import Header, { CustomHeaderWithBtn, MemoHeader } from "./components/Header";
import Todo from "./components/Todo";

// basic App with unecessary re-renders
// function App() {
//   const [title, setTitle] = useState("Title");
//   const updateTitle = () => setTitle(Math.random());
//   return (
//     <>
//       <Header title={title} />
//       <Header title="About" />
//       <Header title="Contact" />
//     </>
//   );
// }

// 1. pushing state variables down to children components
// function App() {
//   return (
//     <>
//       <CustomHeaderWithBtn />
//       <Header title="About" />
//       <Header title="Contact" />
//     </>
//   );
// }

// // 2. solution using React.memo
// function App() {
//   const [title, setTitle] = useState("Title");
//   const updateTitle = () => setTitle(Math.random());

//   return (
//     <div>
//       <button onClick={() => updateTitle()}>
//         Click me to change the title
//       </button>

//       <MemoHeader title={title} />

//       <MemoHeader title="Home" />
//       <MemoHeader title="About" />
//       <MemoHeader title="Contact" />
//     </div>
//   );
// }

let counter = 4; // global counter variable to set IDs
function App() {
  const [todos, setTodos] = useState([
    { id: 1, title: "todo 1", description: "todo-desc-1" },
    { id: 2, title: "todo 2", description: "todo-desc-2" },
    { id: 3, title: "todo 3", description: "todo-desc-3" },
  ]);

  function addNewTodo() {
    setTodos([
      ...todos,
      {
        id: counter++,
        title: "new todo",
        description: "new todo added",
      },
    ]);
    alert("new todo added successfully!");
  }

  return (
    <>
      <button onClick={() => addNewTodo()}>Add a random todo</button>
      {todos.map((todo) => (
        <Todo key={todo.id} title={todo.title} description={todo.description} />
      ))}
    </>
  );
}

export default App;
