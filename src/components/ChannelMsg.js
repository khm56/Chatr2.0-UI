import { fetchChannelMsg, setLoading } from "../redux/actions";
import React, { Component } from "react";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PostMessage from "./PostMessage";
import MessageCard from "./MessageCard";
import Loading from "./Loading";

class ChannelMsg extends Component {
  componentDidMount() {
    this.props.setLoading();
    this.interval = setInterval(() => {
      let channelID = this.props.match.params.channelID;
      this.props.fetchMessages(channelID);
    }, 1000);
  }

  componentDidUpdate(prevProps) {
    let channelID = this.props.match.params.channelID;
    if (channelID !== prevProps.match.params.channelID) {
      //Clearing the interval and setting a new one should happen here not in the else
      this.props.setLoading();
      this.props.fetchMessages(channelID);
    } else {
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        this.props.fetchMessages(channelID);
      }, 1000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  FetchImage() {
    const channel = this.props.channels.find(channel => {
      if (channel.id == this.props.match.params.channelID) {
        return channel;
      }
    });
    if (channel) {
      if (channel.image_url) return channel.image_url;
    }
    return "https://wpamelia.com/wp-content/uploads/2019/02/4k-wallpaper-architecture-background-1308624.jpg";
  }

  render() {
    if (!this.props.user) return <Redirect to="/Welcome" />;
    let image_url = this.FetchImage();
    return (
      <div
        className="bgImage"
        style={{
          backgroundImage: `url(${image_url})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          backgroundPosition: "center"
        }}
      >
        {this.props.loading ? (
          <Loading />
        ) : (
          this.props.messages.map(msg => {
            return (
              <div>
                <br />
                <div key={msg.id}>
                  <MessageCard msg={msg} />
                </div>
              </div>
            );
          })
        )}
        <br />;
        <PostMessage channelID={this.props.match.params.channelID} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    channels: state.rootChannels.channels,
    messages: state.rootMessages.messages,
    loading: state.rootMessages.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMessages: channelID => dispatch(fetchChannelMsg(channelID)),
    setLoading: () => dispatch(setLoading())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelMsg);
