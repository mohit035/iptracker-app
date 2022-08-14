import React from "react";

const MainDisplay = ({ ip, location, timezone, isp }) => {
  return (
    <div className="d-flex display-container position-absolute">
      <div className="d-flex flex-column py-2 px-3">
        <span className="small-text">IP Address</span>
        <span className="normal-text">{ip}</span>
      </div>
      <div className="divider"></div>
      <div className="d-flex flex-column py-2 px-3">
        <span className="small-text">Location</span>
        <span className="normal-text">
          {location[0]}, {location[1]} {location[2]}
        </span>
      </div>
      <div className="divider"></div>
      <div className="d-flex flex-column py-2 px-3">
        <span className="small-text">Timezone</span>
        <span className="normal-text">{timezone}</span>
      </div>
      <div className="divider"></div>
      <div className="d-flex flex-column py-2 px-3">
        <span className="small-text">ISP</span>
        <span className="normal-text">{isp}</span>
      </div>
    </div>
  );
};

export default MainDisplay;
