import React, { Component } from "react";

class MyMessage extends Component {
  render() {
    const month = this.props.time.slice(5, 7);
    const day = this.props.time.slice(8, 10);
    const time = this.props.time.slice(11, 16);
    return (
      <>
        <div
          className="d-flex justify-content-end mb-5"
          style={{ marginRight: "30px" }}
        >
          <div className="msg_cotainer_send " style={{ minWidth: "70px" }}>
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
          <div className="img_cont_msg">
            <img
              src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
              className="rounded-circle user_img_msg"
            />
          </div>
        </div>
      </>
    );
  }
}

export default MyMessage;
