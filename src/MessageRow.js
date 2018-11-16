import React, { Component } from "react";
import { connect } from "react-redux";

class MessageRow extends Component {
  render() {
    const message = this.props.message;
    return (
      <div className="container">
        {message.username === this.props.user.username ? (
          <div className="row ">
            <div className="col-9 ">
              <td className="border-0" style={{ float: "right" }}>
                <div className="row ">
                  <div
                    className="col-6"
                    style={{
                      color: "#191970",
                      textAlign: "right",
                      minWidth: "100%"
                    }}
                  >
                    <div
                      className="col-9 speech-bubble-right"
                      style={{ float: "right" }}
                    >
                      {message.message}
                    </div>
                  </div>
                  <div
                    className="col-6"
                    style={{ minWidth: "100%", float: "right" }}
                  >
                    <td
                      className="border-0"
                      style={{
                        fontStyle: "italic",
                        fontSize: "8px",
                        textAlign: "left",
                        float: "right"
                      }}
                    >
                      {message.timestamp}
                    </td>
                  </div>
                </div>
              </td>
            </div>
            <div className="col-3">
              <td
                className="border-0"
                style={{
                  color: "rgb(193,47,60)",
                  fontFamily: "Georgia",
                  fontWeight: "Bold",
                  fontSize: "15px",
                  textAlign: "right"
                }}
              >
                {message.username.toUpperCase()}
              </td>
            </div>
          </div>
        ) : (
          <div className="row " style={{ width: "100%" }}>
            <div className="col-3 " style={{ minWidth: "100%" }}>
              <td
                className="border-0 p"
                style={{
                  color: "#6495ed",
                  fontFamily: "Georgia",
                  fontWeight: "Bold",
                  fontSize: "15px"
                }}
              >
                {message.username.toUpperCase()}
              </td>
            </div>
            <div className="col-9" style={{ flaot: "left" }}>
              <td className="border-0" style={{ float: "left" }}>
                <div className="row ">
                  <div
                    className="col-6 "
                    style={{ color: "#191970", minWidth: "100%" }}
                  >
                    <div className="col-9 speech-bubble">{message.message}</div>
                  </div>

                  <div className="col-6 " style={{ minWidth: "100%" }}>
                    <td
                      className="border-0"
                      style={{
                        fontStyle: "italic",
                        fontSize: "8px",
                        textAlign: "right",
                        float: "left"
                      }}
                    >
                      {message.timestamp}
                    </td>
                  </div>
                </div>
              </td>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.rootAuth.user
  };
};
export default connect(mapStateToProps)(MessageRow);
