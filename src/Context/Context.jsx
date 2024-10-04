import { createContext, useState } from "react";
import run from "../config/Gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [extended, setExtended] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const onSend = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    setCurrentPrompt(input || prompt);

    let response = "";
    if (prompt !== undefined) {
      response = await run(prompt);
      setRecentPrompt(prompt);
    } else {
      setPrevPrompt((prev) => [...prev, input]);
      setRecentPrompt(input);
      response = await run(input);
    }

    const parsedResponse = response
      .replace(/##\s(.+)/g, "<h2>$1</h2>") // Convert headings
      .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>") // Convert bold text
      .replace(/- (.+)/g, "<li>$1</li>") // Convert list items
      .replace(/```(\w+)\n([\s\S]+?)```/g, "<pre>$2</pre>") // Convert code blocks
      .replace(/`(.*?)`/g, "<code>$1</code>") // Convert code blocks
      .replace(/\n/g, "<br>") // Replace new lines with <br>
      .replace(/\* /g, "➡ "); // Add symbol

    // parsedResponse += "<p>End of respose</p>"
    console.log(response);
    setResultData(parsedResponse);
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
    newChat,
    extended,
    setExtended,
    currentPrompt,
    setCurrentPrompt,
  };
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
