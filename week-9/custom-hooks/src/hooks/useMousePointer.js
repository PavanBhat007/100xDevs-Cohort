import { useEffect, useState } from "react";

export const useMousePointer = () => {
  const [location, setLocation] = useState([0, 0]);

  const handleMouseMove = (e) => {
    setLocation([e.clientX, e.clientY]);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [location]);

  return location;
};
