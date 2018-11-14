import React, { Component } from "react";

class MessageRow extends Component {
  render() {
    const message = this.props.message;
    return (
      <tr className="border-0">
        <td
          className="border-0 p"
          style={{
            color: "#6495ed",
            fontFamily: "Georgia",
            fontWeight: "Bold",
            fontSize: "20px"
          }}
        >
          {message.username}
        </td>
        <td className="border-0">
          <div className="row ">
            <div className="col-6" style={{ color: "#191970" }}>
              <div className="col-9 speech-bubble">{message.message}</div>
            </div>

            <div className="col-6">
              <td
                className="border-0"
                style={{
                  fontStyle: "italic",
                  fontSize: "8px",
                  textAlign: "right"
                }}
              >
                {message.timestamp}
              </td>
            </div>
          </div>
        </td>
      </tr>
    );
  }
}

export default MessageRow;
