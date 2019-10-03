import React, { Component } from "react";

class MessageCard extends Component {
  render() {
    return (
      <div className="speech-bubble">
        <h4>{this.props.msg.username}</h4>
        <p>{this.props.msg.message}</p>
        <h5>{this.props.msg.timestamp}</h5>
      </div>
    );
  }
}

export default MessageCard;
