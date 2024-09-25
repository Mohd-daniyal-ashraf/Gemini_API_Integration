import React, { useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
function Sidebar() {
  const [extended, setExtended] = useState(false);

  return (
    <div className="sidebar">
      <div className="top">
        <img src={assets.menu_icon} onClick={()=>setExtended(prev => !prev)} alt="menu_icon" className="menu" />
        <div className="new-chat">
          <img src={assets.plus_icon} alt="plus_icon" />
          {extended ? <p>New CHat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            <div className="recent-entry">
              <img src={assets.message_icon} alt="message_icon" />
              <p>What is react...</p>
            </div>
          </div>
        ) : null}
      </div>

      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="question_icon" />
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="history_icon" />
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="setting_icon" />
          {extended ? <p>Setting</p> : null}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
