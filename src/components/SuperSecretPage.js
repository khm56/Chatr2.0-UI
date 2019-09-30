import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import TextingArea from "./TextingArea";
import { checkForExpiredToken } from "../redux/actions";
const instance = axios.create({
  baseURL: "https://api-chatr.herokuapp.com/"
});

class SuperSecretPage extends Component {
  state = {
    channel: null
  };
  componentDidMount() {
    this.getChannel();
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.match.params.channelID !== this.props.match.params.channelID
    ) {
      this.getChannel();
    }
  }

  getChannel = async () => {
    const channelID = this.props.match.params.channelID;
    try {
      const res = await axios.get(
        `https://api-chatr.herokuapp.com/channels/${channelID}/`
      );
      const channel = res.data;
      this.setState({ channel: channel });
      console.log(this.state.channel);
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const msgs = () => {
      if (this.state.channel)
        return this.state.channel.map(text => (
          <div key={text.id}>
            {" "}
            username: {text.username} - message: {text.message}
          </div>
        ));
    };

    if (!this.props.user) return <Redirect to="/login" />;
    return (
      <div className="ml-4 text-center">
        {/* <p>{this.state.channel}</p> */}
        {msgs()}
        <TextingArea />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
  channels: state.channels
});

export default connect(mapStateToProps)(SuperSecretPage);
