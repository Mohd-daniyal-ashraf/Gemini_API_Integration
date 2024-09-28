import "./Main.css";
import React, { useContext, useRef, useEffect } from "react";
import { assets } from "../../assets/assets";
import { Context } from "../../Context/Context";
import Typed from "typed.js";

function Main() {
  const {
    onSend,
    input,
    setInput,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setRecentPrompt,
    setPrevPrompt,
    setExtended,
    extended
  } = useContext(Context);

  const typedElement = useRef();

  useEffect(() => {
    if (typedElement.current && resultData) {
      const typed = new Typed(typedElement.current, {
        strings: [resultData],
        typeSpeed: 1,
        backSpeed: 1,
        showCursor: false,
      });

      return () => {
        typed.destroy();
      };
    }
  }, [resultData]);

  const loadePrompt = async (prompt) => {
    setPrevPrompt((prev) => [...prev, prompt]);
    setRecentPrompt(prompt);
    await onSend(prompt);
  };

  return (
    <div className="main">
      <div className="nav">
        <p>
          <img
            src={assets.menu_icon}
            onClick={() => setExtended((prev) => !prev)}
            alt="menu_icon"
          />
          Gemini
        </p>
        <img src={assets.user_icon} alt="user_icon" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="great">
              <p>
                <span>Hello, Dev.</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div
                className="card"
                onClick={() =>
                  loadePrompt(
                    "Suggest beautiful places to see on an upcoming road trip"
                  )
                }
              >
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div
                className="card"
                onClick={() =>
                  loadePrompt("Briefly summarize this concept: urban planning")
                }
              >
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div
                className="card"
                onClick={() =>
                  loadePrompt(
                    "Brainstorm team bonding activities for our work retreat"
                  )
                }
              >
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div
                className="card"
                onClick={() =>
                  loadePrompt("Tell me about React js and React native")
                }
              >
                <p>Tell me about React js and React native</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="user_icon" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img
                src={assets.gemini_icon}
                alt=""
                className={loading ? "rotate" : ""}
              />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p ref={typedElement} className="gemini-response"></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              placeholder="Enter a prompt here"
            />
            <div>
              <img src={assets.gallery_icon} alt="gallery_icon" />
              <img src={assets.mic_icon} alt="mic_icon" />
              {input ? (
                <img
                  onClick={() => onSend()}
                  src={assets.send_icon}
                  alt="send_icon"
                  className="send_img"
                />
              ) : null}
            </div>
          </div>
          <div className="bottom-info">
            Gemini may display inaccurate info, including about people, so
            double-check its responses. Your privacy and Gemini Apps. <br />
            Build By{" "}
            <a href="https://github.com/Mohd-daniyal-ashraf">Daniyal</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
