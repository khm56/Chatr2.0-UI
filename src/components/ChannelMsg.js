import { fetchChannelMsg } from "../redux/actions";
import React, { Component } from "react";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import PostMessage from "./PostMessage";

class ChannelMsg extends Component {
  componentDidMount() {
    let channelID = this.props.match.params.channelID;
    this.props.fetchMessages(channelID);
  }

  componentDidUpdate(prevProps) {
    let channelID = this.props.match.params.channelID;
    if (channelID !== prevProps.match.params.channelID) {
      this.props.fetchMessages(channelID);
    }
  }

  render() {
    if (!this.props.user) return <Redirect to="/Welcome" />;
    return (
      <div>
        {this.props.messages.map(element => {
          return (
            <div class="card">
              <div class="card-body">{element.message}</div>
              <div class="card-text">{element.username}</div>
              <div class="card-text">{element.timestamp}</div>
            </div>
          );
        })}
        <PostMessage channelID={this.props.match.params.channelID} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    channels: state.rootChannels.channels,
    messages: state.rootMessages.messages
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMessages: channelID => dispatch(fetchChannelMsg(channelID))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelMsg);
