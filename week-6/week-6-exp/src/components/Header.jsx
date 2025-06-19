import { useState, memo } from "react";

// plain default static component without state variables
export default function Header({ title }) {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
}

// using a custom component with state variables
// pushed down from parent to avoid re-rendering siblings
export function CustomHeaderWithBtn() {
  const [title, setTitle] = useState("Title");

  const updateTitle = () => setTitle(Math.random());

  return (
    <>
      <button onClick={() => updateTitle()}>
        Click me to change the title
      </button>
      <h1>{title}</h1>
    </>
  );
}

// using React.memo to avoid re-rendering components
// with unchanged state variables
export const MemoHeader = memo(({ title }) => {
  return (
    <div>
      <h1>{ title }</h1>
    </div>
  );
});
