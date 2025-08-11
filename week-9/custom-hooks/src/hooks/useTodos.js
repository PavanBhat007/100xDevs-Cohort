import { useState, useEffect } from "react";
import axios from "axios";

// Custom hook that fetches todos from a backend
export const useTodos = (refreshTime) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = () => {
    axios.get("http://localhost:8080/todos").then((response) => {
      setTodos(response.data.todos);
      setLoading(false);
    });
  };

  useEffect(() => {
    // Interval that excutes the passed function
    // every n seconds, but only thing it that Interval
    // first executes after the 'n'seconds so run once
    // while Interval is waiting for the first 'n' seconds.
    const intervalID = setInterval(() => fetchTodos(), refreshTime * 1000);
    fetchTodos();

    return () => {
      clearInterval(intervalID);
    };
  }, [refreshTime]);

  return { todos, loading };
};
