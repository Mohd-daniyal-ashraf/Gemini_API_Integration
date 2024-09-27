// useTyped.js
import { useEffect, useRef, useContext } from "react";
import Typed from "typed.js";
import { Context } from "../Context/Context";

const useTyped = () => {
  const typedElement = useRef(null);
  const { resultData, loading } = useContext(Context);
 

  return typedElement;
};

export default useTyped;
