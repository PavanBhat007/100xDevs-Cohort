import { useTodos } from "../hooks/useTodos";

const Todos = () => {
  // custom hook that encapsulates
  // state and data fetching logic and gives back todos
  const { todos, loading } = useTodos(5);

  return (
    <div>
      {!loading ? (
        <div>
          <h1>Todos</h1>
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
      ) : (
        <p>Loading ...</p>
      )}
    </div>
  );
}

function Todo({ title, description }) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}


export default Todos
