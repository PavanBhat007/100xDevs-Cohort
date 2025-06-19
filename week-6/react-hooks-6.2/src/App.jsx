import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import "./App.css";

export function Effect() {
  const [todoID, setTodoID] = useState(0);

  return (
    <div>
      <button onClick={() => setTodoID(1)}>1</button>
      <button onClick={() => setTodoID(2)}>2</button>
      <button onClick={() => setTodoID(3)}>3</button>
      <button onClick={() => setTodoID(4)}>4</button>
      <button onClick={() => setTodoID(5)}>5</button>
      <button onClick={() => setTodoID(6)}>6</button>
      <Todo id={todoID} />
    </div>
  );
}

// without memoization
export function Memo() {
  const [num, setNum] = useState(0);
  const [counter, setCounter] = useState(0);
  // const [finalVal, setFinalVal] = useState(0);

  // // re-renders when onChnage triggered
  // // calculated for every digit entered
  // // also gets re-executed when counter updates
  // let count = 0;
  // for(let i=1; i<=num; i++) count += i;

  // okay approach => for-loop runs only when 'num' updates
  // useEffect(() => {
  //   let count = 0;
  //   for(let i=1; i<=num; i++) count += i;
  //   setFinalVal(count);
  // }, [num])

  // useEffect approach requires extra state variable that is
  // dependant on already exisiting state variable
  // also, re-renders twice, once for inputValue change
  // and 2nd time for finalValue change

  // optimal yet not really necessary approach -> useMemo
  let count = useMemo(() => {
    let it = 0;
    for (let i = 1; i <= num; i++) it += i;

    return it;
  }, [num]); // runs only when 'num' changes

  return (
    <div>
      <input
        onChange={(e) => {
          setNum(e.target.value);
        }}
        placeholder="Enter a number"
      ></input>

      <p>
        Sum from 1 to {num} is {count}{" "}
      </p>
      <button
        onClick={() => {
          setCounter(counter + 1);
        }}
      >
        Counter - {counter}
      </button>
    </div>
  );
}

function Todo({ id }) {
  const [todo, setTodo] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:8080/todo?id=${id}`).then((res) => {
      setTodo(res.data.todo);
    });
  }, [id]);

  return (
    <>
      <h1>{todo.title}</h1>
      <h3>{todo.description}</h3>
    </>
  );
}
