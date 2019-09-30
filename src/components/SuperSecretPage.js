import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import TextingArea from "./TextingArea";
import { getChannel } from "../redux/actions";

class SuperSecretPage extends Component {
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
    const msgs = () => {
      if (this.props.channel)
        return this.props.channel.map(text => (
          <div key={text.id}>
            {" "}
            username: {text.username} - message: {text.message}
          </div>
        ));
    };

    if (!this.props.user) return <Redirect to="/login" />;
    return (
      <div className="ml-4 text-center">
        {msgs()}
        <TextingArea />
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
