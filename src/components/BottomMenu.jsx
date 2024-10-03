import React from "react";
import "./BottomMenu";

function BottomMenu() {
  return (
    <div className="container" >
      <box-icon name="like" ></box-icon>
      <box-icon name="dislike"></box-icon>
      <box-icon name="share-alt"></box-icon>
      <box-icon type="solid" name="download"></box-icon>
    </div>
  );
}

export default BottomMenu;
