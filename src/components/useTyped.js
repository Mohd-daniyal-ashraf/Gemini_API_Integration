// useTyped.js
import { useEffect, useRef, useContext } from "react";
import Typed from "typed.js";
import { Context } from "../Context/Context";

const useTyped = () => {
  const typedElement = useRef(null);
  const { resultData } = useContext(Context);
  useEffect(() => {
    if (typedElement.current && resultData) {
      const typed = new Typed(typedElement.current, {
        strings: [resultData],
        typeSpeed: 8,
        showCursor: false,
      });

      return () => {
        typed.destroy();
      };
    }
  }, [resultData]);

  return typedElement;
};

export default useTyped;
