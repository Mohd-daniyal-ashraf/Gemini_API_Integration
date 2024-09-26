import { createContext, useState } from "react";
import run from "../config/Gemini";
import { split } from "postcss/lib/list";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const deplayPara = (index, nextword) => {};
  const onSend = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(input);
    setPrevPrompt((prev) => [...prev, input]);

    const response = await run(input);
    let newresponce = response.split("**");
    let newArray ="";
    for (let i = 1; i < newresponce.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newArray += newresponce[i];
      } else {
        newArray += "<b>" + newresponce[i] + "</b>";
      }
    }
    newArray = newArray.split("*").join("</br>")

    console.log(response);
    setResultData(newArray);
    setLoading(false);
    setInput("");
  };

  const contextValue = {
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    prevPrompt,
    setPrevPrompt,
    showResult,
    setShowResult,
    loading,
    setLoading,
    resultData,
    setResultData,
    onSend,
  };
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
