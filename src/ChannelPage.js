import React, { Component } from "react";
import { connect } from "react-redux";
//import MsgRow from "./MsgRow";
import { fetchMsgs } from "./redux/actions";
import MsgForm from "./MsgForm";

class ChannelPage extends Component {
  componentDidMount() {
    this.props.fetchMsgs(this.props.match.params.channelID);
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.match.params.channelID !== prevProps.match.params.channelID
    ) {
      //this.setState({changed :true})
      return this.props.fetchMsgs(this.props.match.params.channelID);
    }
  }

  render() {
    //const channel = this.props.channel;
    // const found = this.props.channels.find(function(channel) {
    //   return channel == this.match.params.channelID;
    // });
    // console.log("hi", found);
    console.log("channel ID", this.props.match.params.channelID);
    return (
      <div>
        <h1>hiiiiiiiiiiii</h1>

        {this.props.msgs.map(msg => {
          return (
            <div>
              {msg.username}-{msg.message}-{msg.timestamp}
            </div>
          );
        })}
        
        <div>
          <MsgForm channelID={this.props.match.params.channelID} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    msgs: state.channelroot.msgs,
    channels: state.channelroot.channels
  };
};
const mapDispatchToProps = dispatch => ({
  fetchMsgs: channelID => dispatch(fetchMsgs(channelID))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelPage);
