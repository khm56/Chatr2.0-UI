import React, { Component } from "react";

class Message extends Component {
  getMessage() {
    if (this.props.user !== this.props.message.username) {
      return (
        <div className="d-flex justify-content-start mb-4">
          <div className="msg_cotainer">
            <strong>{this.props.message.username}</strong>
            <br />
            {this.props.message.message}
            <span className="msg_time">
              {this.props.message.timestamp.substring(11, 16)}
            </span>
          </div>
          <div className="img_cont_msg"></div>
        </div>
      );
    } else {
      return (
        <div className="d-flex justify-content-end mb-4">
          <div className="msg_cotainer_send">
            <strong>{this.props.message.username}</strong>
            <br />
            {this.props.message.message}
            <span className="msg_time_send">
              {this.props.message.timestamp.substring(11, 16)}
            </span>
          </div>
          <div className="img_cont_msg"></div>
        </div>
      );
    }
  }
  render() {
    return <>{this.getMessage()}</>;
  }
}

export default Message;
