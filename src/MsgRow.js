import React, { Component } from "react";

class ChannelRow extends Component {
  render() {
    const msg = this.props.msg;

    return <div>hello msgs{msg}</div>;
  }
}

export default ChannelRow;
