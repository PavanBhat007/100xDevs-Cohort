import { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";

export const DebouncedInput = () => {
  const [input, setInput] = useState("");
  const debouncedInput = useDebounce(input, 500);

  return (
    <>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search ..."
      />
      <p>Debounced value: {debouncedInput}</p>
    </>
  );
};
