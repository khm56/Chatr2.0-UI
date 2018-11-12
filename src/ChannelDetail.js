import React, { Component } from "react";

// Components
import MessageTable from "./MessageTable";
import Loading from "./Loading";
import AddMessageModal from "./AddMessageModal";

import { connect } from "react-redux";

import * as actionCreators from "./store/actions/index";

class ChannelDetail extends Component {
  componentDidMount() {
    this.props.getChannel(this.props.match.params.channelID);
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.match.params.channelID !== this.props.match.params.channelID
    ) {
      this.props.getChannel(this.props.match.params.channelID);
    }
  }

  render() {
    const channelID = this.props.match.params.channelID;
    console.log(this.props.channels);

    if (this.props.loading) {
      return <Loading />;
    } else {
      const channel = this.props.channel.channel;
      const channelCont = this.props.channels.find(
        channel => channel.id === +channelID
      );
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
          <MessageTable channel={channel} />
          {this.props.user ? <AddMessageModal channel={channelID} /> : <div />}
        </div>
      );
    }
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
