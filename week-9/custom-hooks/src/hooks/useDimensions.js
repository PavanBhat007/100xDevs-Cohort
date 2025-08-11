import { useEffect, useState } from "react";

export const useDimensions = () => {
  const [dimensions, setDimensions] = useState({
    width: window.screen.width,
    height: window.screen.height,
  });

  const handleWindowResize = (e) => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
  }, [dimensions]);

  return dimensions;
};
