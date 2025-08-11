import { useEffect } from "react";

export const useInterval = (func, delay) => {
  useEffect(() => {
    const intID = setInterval(func, delay);

    return () => {
      clearInterval(intID);
    };
  }, []);
};
