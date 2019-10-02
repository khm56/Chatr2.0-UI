import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import TextingArea from "./TextingArea";
import { getChannel } from "../redux/actions";

//Components
import MsgsBox from "./MessagesArea";

class SuperSecretPage extends Component {
  state = {
    interval: null
  };
  componentWillUnmount = () => {
    clearInterval(this.state.interval);
  };

  changeInterval = () => {
    clearInterval(this.state.interval);
    this.props.getChannel(this.props.match.params.channelID);
    let interval = setInterval(
      () => this.props.getChannel(this.props.match.params.channelID),
      1000
    );
    this.setState({ interval: interval });
  };
  componentDidMount = () => {
    this.changeInterval();
  };
  componentDidUpdate(prevProps) {
    if (
      prevProps.match.params.channelID !== this.props.match.params.channelID
    ) {
      this.changeInterval();
    }
  }
  getImg = channelID => {
    let obj = this.props.channels.filter(channel => channel.id == channelID);
    if (obj[0]) return obj[0].image_url;
  };

  render() {
    const msgs = () => this.props.channel.map(text => <MsgsBox text={text} />);
    let background;
    if (!this.props.user) return <Redirect to="/login" />;
    if (this.getImg(this.props.match.params.channelID))
      background = this.getImg(this.props.match.params.channelID);
    else
      background =
        "https://media.gettyimages.com/videos/abstract-stripes-background-loop-video-id946877514?s=640x640(12 kB)";
    return (
      <div
        className="container ml-5 text-left   "
        style={{
          backgroundImage: `url(${background})`
          // backgroundRepeat: " no-repeat"
          // opacity: "0.5",
        }}
      >
        <div className="mesgs">
          <div className="msg_history">{msgs()}</div>
          <TextingArea channelID={this.props.match.params.channelID} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getChannel: channelID => dispatch(getChannel(channelID))
});
const mapStateToProps = state => ({
  user: state.user,
  channel: state.channels.channel,
  channels: state.channels.channels
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SuperSecretPage);
