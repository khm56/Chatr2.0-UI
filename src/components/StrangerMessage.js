import React, { Component } from "react";

class StrangerMessage extends Component {
  render() {
    const month = this.props.time.slice(5, 7);
    const day = this.props.time.slice(8, 10);
    const time = this.props.time.slice(11, 16);
    return (
      <>
        <p
          style={{
            marginLeft: "50px",
            position: "relative",
            top: "80px",
            right: "50px",
            color: "white"
          }}
        >
          {this.props.user}
        </p>
        <div
          className="d-flex justify-content-start mb-4"
          style={{ marginRight: "30px" }}
        >
          <div className="img_cont_msg">
            <img
              src="https://s3.us-east-2.amazonaws.com/hda/assets/chat-icon.gif"
              className="rounded-circle user_img_msg"
            />
          </div>

          <div
            className="msg_cotainer"
            style={{ minWidth: "70px", left: "10px" }}
          >
            {this.props.message}
            <span className="msg_time_send">
              {day}-{month}
            </span>
            <span
              className="msg_time_send"
              style={{
                right: "30px",
                color: "red"
              }}
            >
              {time}
            </span>
          </div>
        </div>
      </>
    );
  }
}

export default StrangerMessage;
