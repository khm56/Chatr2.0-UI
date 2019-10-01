import React, { Component } from "react";
//import ChannelRow from "./ChannelRow";
import { connect } from "react-redux";

class ChannelsList extends Component {
  render() {
    if (!this.props.user)
      return (
        <div>
          <Redirect to="/" />;
        </div>
      );
    const ChannelRow = this.props.channels.map(channel => (
      <ChannelRow key={channel.id} channel={channel} />
    ));
    return <div>{ChannelRow}</div>;
  }
}

const mapStateToProps = state => {
  return {
    channels: state.channels,
    user: state.user
  };
};

export default connect(mapStateToProps)(ChannelsList);
