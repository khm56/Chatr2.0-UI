import React, { Component } from "react";
import moment from "moment";

class MessageCard extends Component {
  render() {
    return (
      <div className="speech-bubble">
        <h4>{this.props.msg.username}</h4>
        <p>{this.props.msg.message}</p>
        <h5>{moment(this.props.msg.timestamp).fromNow()}</h5>
      </div>
    );
  }
}

export default MessageCard;
