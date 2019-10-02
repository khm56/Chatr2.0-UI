import React, { Component } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSpinner } from "@fortawesome/free-solid-svg-icons";

class Message extends Component {
  getMessage() {
    if (this.props.user == this.props.message.username) {
      return (
        <div className="col">
          <div className="speech-wrapper float-right">
            <div className="bubble" style={{ backgroundColor: "#d62929" }}>
              <div className="txt">
                <p className="name" style={{ color: "#ffcf40" }}>
                  {this.props.message.username}
                </p>
                <p className="message" style={{ color: "white" }}>
                  {this.props.message.message}
                </p>
                <span className="timestamp">10:20 pm</span>
              </div>
              <div
                className="bubble-arrow"
                style={{ borderTop: "#f5f5f5" }}
              ></div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="col">
          <div className="speech-wrapper">
            <div className="bubble alt">
              <div className="txt">
                <p className="name alt">{this.props.message.username}</p>
                <p className="message">{this.props.message.message}</p>
                <span className="timestamp">10:22 pm</span>
              </div>
              <div className="bubble-arrow alt"></div>
            </div>
          </div>
        </div>
      );
    }
  }
  render() {
    return <div className="row">{this.getMessage()}</div>;
  }
}

export default Message;
