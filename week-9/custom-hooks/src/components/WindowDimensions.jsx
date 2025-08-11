import { useDimensions } from "../hooks/useDimensions";

const WindowDimensions = () => {
  const { width, height } = useDimensions();

  return (
    <div>
      Window Dimensions: {width} X {height}
    </div>
  );
};

export default WindowDimensions;
