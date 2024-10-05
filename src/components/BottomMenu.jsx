import React, { useState, useContext } from "react";
import "./BottomMenu.css";
import DownloadPDF from "./main/DownloadPDF";
import { Context } from "../Context/Context";

function BottomMenu({ classname }) {
  const { input, prevPrompt, currentPrompt } = useContext(Context);
  const [isLiked, setIsLiked] = useState(false);
  const [isdisLiked, setIsdisLiked] = useState(false);

  const { handleDownload } = DownloadPDF({
    selector: classname,
    options: {
      pageSize: "a4", // A4 page size
      marginTop: 40, // Top margin
      marginLeft: 50, // Left margin
      marginBottom: 40, // Bottom margin
      marginRight: 30, // Right margin
      fileName: currentPrompt, // Custom file name
      orientation: "p", // Portrait mode
    },
  });

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    if (isdisLiked) {
      setIsdisLiked(false);
    }
  };
  const handledisLikeClick = () => {
    setIsdisLiked(!isdisLiked);
    if (isLiked) {
      setIsLiked(false);
    }
  };

  return (
    <div className="container">
      <box-icon
        name="like"
        color={isLiked ? "#339900" : "black"}
        onClick={handleLikeClick}
      ></box-icon>
      <box-icon
        name="dislike"
        color={isdisLiked ? "#cc3300" : "black"}
        onClick={handledisLikeClick}
      ></box-icon>
      <box-icon name="share-alt"></box-icon>
      <box-icon
        type="solid"
        name="download"
        id="download-btn"
        animation="fade-down-hover"
        onClick={handleDownload}
      ></box-icon>
    </div>
  );
}

export default BottomMenu;
