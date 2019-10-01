import React from "react";

const Messages = props => {
  return (
    <div className="m-5">
      <div style={{ textAlign: "center" }} className="card">
        <h4>
          <span style={{ color: "blue" }}> Timestamp: </span>{" "}
          {props.messages.timestamp} <br />
          <span style={{ color: "red" }}> Username:</span>{" "}
          {props.messages.username} <br />
          <span style={{ color: "green" }}> Messages: </span>
          {props.messages.message}{" "}
        </h4>
      </div>
    </div>
  );
};

export default Messages;
