import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { fetchSelectedChannel } from "../redux/actions";
import AddMessages from "./AddMessages";
class FetchSelectedChannel extends React.Component {
  state = { collapsed: false };

  componentDidMount() {
    this.props.fetchSelectedChannel(this.props.match.params.channelID);
  }
  componentDidUpdate(prevProps) {
    if (this.props.match.params.channelID != prevProps.match.params.channelID)
      this.props.fetchSelectedChannel(this.props.match.params.channelID);
  }
  render() {
    // console.log(this.props.messages);
    // console.log(this.props.channels);
    // console.log(this.props.user);

    // if (!this.props.user) return <Redirect to="/welcome" />;
    return (
      <div>
        {this.props.messages.map(channel => {
          return (
            <ul class="list-group">
              <li class="list-group-item">{channel.username}</li>
              <li class="list-group-item">{channel.timestamp}</li>
              <li class="list-group-item">{channel.message}</li>
            </ul>
          );
        })}
        <AddMessages channelID={this.props.match.params.channelID} />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
    channels: state.rootChannel.channels,
    messages: state.rootMessages.messages
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSelectedChannel: channelID => dispatch(fetchSelectedChannel(channelID))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FetchSelectedChannel);
