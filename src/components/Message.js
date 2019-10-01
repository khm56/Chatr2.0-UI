import React, { Component } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSpinner } from "@fortawesome/free-solid-svg-icons";

class Message extends Component {
  getMessage() {
    if (this.props.user == this.props.message.username) {
      return (
        <div className="col">
          <div class="speech-wrapper float-right">
            <div class="bubble">
              <div class="txt">
                <p class="name">{this.props.message.username}</p>
                <p class="message">{this.props.message.message}</p>
                <span class="timestamp">10:20 pm</span>
              </div>
              <div class="bubble-arrow"></div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="col">
          <div className="speech-wrapper">
            <div class="bubble alt">
              <div class="txt">
                <p class="name alt">{this.props.message.username}</p>
                <p class="message">{this.props.message.message}</p>
                <span class="timestamp">10:22 pm</span>
              </div>
              <div class="bubble-arrow alt"></div>
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
