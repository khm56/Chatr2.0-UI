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
    msgs: []
  };
  msges = [];

  getmsgs = () => {
    this.msgs();
    return this.state.msgs.map(text => <MsgsBox text={text} />);
  };
  componentDidMount() {
    this.props.getChannel(this.props.match.params.channelID);
    this.setState({ msgs: this.msges });

    // this.getmsgs();
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.match.params.channelID !== this.props.match.params.channelID
    ) {
      this.props.getChannel(this.props.match.params.channelID);
    }
  }

  msgs = () => {
    if (this.props.channel) {
      const msgarr = this.props.channel.map(text => {
        this.msges.concat(text);
      });
      return msgarr;
    }
  };
  render() {
    const getColor = () => {
      if (this.props.channel) return this.props.channel.image_url;
      else return "";
    };

    if (!this.props.user) return <Redirect to="/login" />;
    return (
      <div
        className="container ml-5 text-left "
        style={{
          backgroundImage: getColor()
        }}
      >
        <div className="mesgs">
          <div className="msg_history">{setInterval(this.getmsgs(), 3000)}</div>
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
  channel: state.channels.channel
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SuperSecretPage);
