import { createContext } from "react";

// CountContext is like the "teleporter"
export const CountContext = createContext({
  count: 0,
  setCount: () => {},
});
