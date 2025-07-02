import {
  RecoilRoot,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { countAtom, evenSelector } from "./store/atoms/count";

function App() {
  return (
    <div>
      <Count />
    </div>
  );
}

function Count() {
  const count = useRecoilValue(countAtom);

  return (
    <div>
      <CountRenderer />
      <Buttons />
    </div>
  );
}

// just need the final value of the state variable
function CountRenderer() {
  const count = useRecoilValue(countAtom);
  return (
    <b>
      {count}
      <EvenCountRenderer />
    </b>
  );
}

// not using the count state variable "here" to derive isEven
function EvenCountRenderer() {
  const isEven = useRecoilValue(evenSelector);
  return <div>{isEven ? "It is even" : ""}</div>;
}

// needs to only update the state, not need to access and display state
function Buttons() {
  const setCount = useSetRecoilState(countAtom);

  // this works because we can get count in setCount by using arrow function
  // and previous value logic, where
  // setCount(prevValue => prevValue + 1) increments the previous value

  return (
    <div>
      <button onClick={() => setCount((count) => count - 1)}>Decrement</button>
      <button onClick={() => setCount((count) => count + 1)}>Increment</button>
    </div>
  );
}

export default App;
