import React, { Component } from "react";

class Messages extends Component {

  render() {
    return (
      <div className="m-5">
        <div style={{ textAlign: "center" }} className="card">
          <h4>
            <span style={{ color: "blue" }}> Timestamp: </span>{" "}
            {this.props.messages.timestamp} <br />
            <span style={{ color: "red" }}> Username:</span>{" "}
            {this.props.messages.username} <br />
            <span style={{ color: "green" }}> Message: </span>
            {this.props.messages.message}{" "}
          </h4>
        </div>
      </div>
    );
  };
}

export default Messages;
