import { useMousePointer } from "../hooks/useMousePointer";

const MousePointer = () => {
  const [x, y] = useMousePointer();

  return (
    <div>
      <p>
        Your Mouse pointer is at X:{x} and Y:{y}
      </p>
    </div>
  );
};

export default MousePointer;
