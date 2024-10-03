import React, { useState } from "react";
import "./BottomMenu.css";

function BottomMenu() {
  const [isLiked, setIsLiked] = useState(false);
  const [isdisLiked, setIsdisLiked] = useState(false);

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
      <box-icon type="solid" name="download"></box-icon>
    </div>
  );
}

export default BottomMenu;
