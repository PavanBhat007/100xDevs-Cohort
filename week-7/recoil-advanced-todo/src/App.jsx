import { RecoilRoot, useRecoilState, useRecoilStateLoadable, useRecoilValue } from 'recoil';
import { todosAtomFamily } from './atoms';

function App() {

  return (
    <RecoilRoot>
      <Todo id={1} />
      <Todo id={2} />
    </RecoilRoot>
  )
}

// function Todo({ id }) {
//   // pass an id to uniquely get the specific atom from atom family
//   // useRecoilValue(atomFamily(atomID))
//   const todo = useRecoilValue(todosAtomFamily(id))
//   console.log(todo);
//   return (
//     <>
//       {todo.title} | {" "}
//       {todo.description}
//       <br/>
//     </>
//   )
// }

// useRecoilStateLoadable, useRecoilValueLoadable
function Todo ({ id }) {
  const [todo, setTodo] = useRecoilStateLoadable(todosAtomFamily(id));

  if (todo.state == "loading") {
    return <h1>Loading ...</h1>
  } else if (todo.state == "hasValue") {
    return (
      <div>
        <h1>{todo.contents.title}</h1>
        <h1>{todo.contents.description}</h1>
      </div>
    )
  } else if (todo.state == "hasError") {
    return <h1>Backend call failed :(</h1>
  }
}

export default App
