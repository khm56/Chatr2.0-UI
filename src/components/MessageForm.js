import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { fetchChannelDetail } from "../redux/actions";
import Messages from "./Messages";

class SendMessageForm extends Component {
  //   state = {
  //     channel:"",
  //     changed:false
  // }
  componentDidMount() {
    this.props.fetchChannelDetail(this.props.match.params.channelID);
  }


  componentDidUpdate(prevProps) {
    const channelID = this.props.match.params.channelID;
    if (prevProps.match.params.channelID !== channelID) {
      this.props.fetchChannelDetail(channelID);
    }

  }



  render() {
    if (!this.props.user) return <Redirect to="/login" />;
    const channel = this.props.channel;
    if (!!channel) {
      const messages = channel.map(message => (
        <Messages key={message.id} messages={message} />
      ));
      return <div>{messages}</div>;
    }
    return <div></div>;
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    channel: state.channel.channel
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchChannelDetail: channelID => dispatch(fetchChannelDetail(channelID))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SendMessageForm);
