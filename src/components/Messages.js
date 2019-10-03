import React from "react";
import moment from "moment";
import "../assets/css/main.css"
import profileIcon from "./profile2.png"

const Messages = props => {

  console.log("props.background", props.background)
  return (
    <div id="bubbles" >
      <img
        src={profileIcon}
        alt="Avatar"
        className="image"
      ></img>
      <span className="username">
        <b> {props.messages.username} </b>
      </span>
      <div className="messages">
        <p>{props.messages.message}</p>
      </div>
      {/* moment(props.messages.timestamp).format('YYYY-MM-DD HH:mm'); */}
      {/* <span className="timestamp">{props.messages.timestamp}</span> */}

      {/* <span className="timestamp">{moment(props.messages.timestamp).format('YYYY-MM-DD HH:mm')}</span> */}
      <span className="timestamp">{moment(props.messages.timestamp).calendar()}</span>

    </div>
  );
};

export default Messages;