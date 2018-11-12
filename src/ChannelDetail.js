import React, { Component } from "react";
import { Redirect } from "react-router-dom";

// Components
import MessageTable from "./MessageTable";
import MessageForm from "./MessageForm";

import { connect } from "react-redux";

import * as actionCreators from "./store/actions/index";

class ChannelDetail extends Component {
  componentDidMount() {
    this.props.getChannel(this.props.match.params.channelID);
    this.interval = setInterval(
      () => this.props.getChannel(this.props.match.params.channelID),
      10000
    );
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.match.params.channelID !== this.props.match.params.channelID
    ) {
      this.props.getChannel(this.props.match.params.channelID);
      clearInterval(this.interval);
      this.interval = setInterval(
        () => this.props.getChannel(this.props.match.params.channelID),
        10000
      );
    }
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    if (!this.props.user) {
      return <Redirect to="/" />;
    }
    const channelID = this.props.match.params.channelID;
    console.log(this.props.channels);

    const channel = this.props.channel.channel;
    const channelCont =
      this.props.channels.find(channel => channel.id === +channelID) || {};
    console.log(channelCont);
    return (
      <div className="channel">
        <div>
          <h3>{channelCont.name}</h3>
          <img
            src={channelCont.image_url}
            className="img-thumbnail img-fluid"
            alt=""
          />
        </div>
        <div>
          <MessageTable channel={channel} />
        </div>
        <div>
          <MessageForm channel={channelID} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.rootAuth.user,
    channel: state.rootChan,
    channels: state.rootChans.channels,
    loading: state.rootChan.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getChannel: channelID =>
      dispatch(actionCreators.fetchChannelDetail(channelID))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelDetail);
