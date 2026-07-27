import React from "react";
import "./Loading.css";

function Loading() {
  return (
    <div className="loading-container">
      <div className="loader"></div>
      <h3>Loading Products...</h3>
    </div>
  );
}

export default Loading;