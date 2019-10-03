import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import TextingArea from "./TextingArea";
import { getChannel } from "../redux/actions";

//Components
import MsgsBox from "./MessagesArea";

class SuperSecretPage extends Component {
  state = {
    interval: null,
    timeStamp: ""
  };
  componentWillUnmount = () => {
    clearInterval(this.state.interval);
    this.setState({ timeStamp: "" });
  };

  changeInterval = () => {
    clearInterval(this.state.interval);
    let interval = setInterval(() => {
      let stamp =
        this.props.channel.length !== 0
          ? this.props.channel[this.props.channel.length - 1].timestamp
          : "";
      this.setState({
        timeStamp: stamp
      });
      this.props.getChannel(
        this.props.match.params.channelID,
        this.state.timeStamp
      );
      // window.scrollBy(0, this.props.channel.length * 1000);
    }, 1000);
    this.setState({ interval: interval });
  };
  componentDidMount = () => {
    this.changeInterval();
  };
  componentDidUpdate(prevProps) {
    // if (prevProps.state.timeStamp !== this.state.timeStamp) {
    //   this.changeInterval();
    // }
    if (prevProps.channel.length > this.props.channel.length)
      window.scrollBy(0, this.props.channel.length * 1000);

    if (
      prevProps.match.params.channelID !== this.props.match.params.channelID
    ) {
      this.changeInterval();
    }
  }
  getImg = channelID => {
    let obj = this.props.channels.filter(channel => channel.id === channelID);
    if (obj[0]) return obj[0].image_url;
  };

  render() {
    const msgs = () =>
      this.props.channel.map(text => <MsgsBox key={text.id} text={text} />);
    let background;
    if (!this.props.user) return <Redirect to="/login" />;
    if (this.getImg(this.props.match.params.channelID) !== null)
      background = this.getImg(this.props.match.params.channelID);
    else
      background =
        "https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_960_720.jpg";
    return (
      <div
        className="container  text-left  "
        style={{
          backgroundImage: `url(${background})`
          // backgroundRepeat: " no-repeat"
          // opacity: "0.5",
        }}
      >
        <div className="messages">
          <ul>{msgs()}</ul>
        </div>
        <div className="message-input ">
          <TextingArea channelID={this.props.match.params.channelID} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getChannel: (channelID, timeStamp) =>
    dispatch(getChannel(channelID, timeStamp))
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
