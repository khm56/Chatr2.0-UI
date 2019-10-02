import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../redux/actions";

class MessagesList extends Component {
  state = { message: "" };

  // componentWillMount() {
  //   const channel = this.props.match.params.ChannelID;
  //   const channelTimes = this.props[`times.${channel}`];
  //   const channelMessages = this.props[`messages.${channel}`];
  //   if (channelMessages) {
  //     this.setState({ loading: false });
  //     if (channelMessages.length) {
  //       console.log("UPDATE");
  //       // if there is a draft for this channel
  //       const ts = channelTimes[channelTimes.length - 1]; // get timestamp of latest message in draft
  //       console.log(ts);
  //       console.log(channelTimes);
  //       this.props.updateDraft(channel, ts); // fetch messages after timestamp of 'ts' and concatenate them to draft of this channel
  //     } else {
  //       console.log("MAKE");
  //       // if there is no draft for this channel, make a new draft
  //       this.props.makeDraft(channel);
  //     }
  //   } else {
  //     this.setState({ loading: false });
  //   }
  // }

  componentDidMount() {
    const channel = this.props.match.params.ChannelID;
    this.props.makeDraft(channel);
  }

  componentDidUpdate() {
    //
    const channel = this.props.match.params.ChannelID;
    const channelTimes = this.props[`times.${channel}`];
    const channelMessages = this.props[`messages.${channel}`];
    clearTimeout(this.timerHandle);
    this.timerHandle = 0;
    this.timerHandle = setTimeout(() => {
      if (channelMessages) {
        this.props.setLoading(false);
        if (channelMessages.length) {
          console.log("UPDATE");
          // if there is a draft for this channel
          const ts = channelTimes[channelTimes.length - 1]; // get timestamp of latest message in draft
          console.log(ts);
          console.log(channelTimes);
          this.props.updateDraft(channel, ts); // fetch messages after timestamp of 'ts' and concatenate them to draft of this channel
        } else {
          console.log("MAKE");
          // if there is no draft for this channel, make a new draft
          this.props.makeDraft(channel);
        }
      }
    }, 5000);
  }

  render() {
    if (this.props.loading) {
      return (
        <>
          <h1>Messages</h1>
          <p className="mx-5"> fetching messages........</p>
        </>
      );
    }
    const channelMessages = this.props[
      `messages.${this.props.match.params.ChannelID}`
    ];
    const channelUsers = this.props[
      `users.${this.props.match.params.ChannelID}`
    ];
    const channelTimes = this.props[
      `times.${this.props.match.params.ChannelID}`
    ];

    const addMessageForm = () => {
      return (
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="Type Message Here"
            name="message"
            value={this.state.message}
            onChange={changeHandler}
          />
          <button onClick={submitHandler}>Send</button>
        </div>
      );
    };

    const changeHandler = e => {
      this.setState({ [e.target.name]: e.target.value });
    };
    var today = new Date();

    const submitHandler = e => {
      e.preventDefault();
      this.props.postMessage(
        this.state.message,
        this.props.match.params.ChannelID
      );
      this.setState({ [e.target.name]: e.target.value, message: "" });
    };
    if (this.props[`messages.${this.props.match.params.ChannelID}`]) {
      return (
        <>
          <h1 className="my-2 mx-5"> Messages </h1>
          {channelMessages}
          <div className="mx-5">{addMessageForm()}</div>
        </>
      );
    } else {
      return (
        <>
          <h1 className="my-2 mx-5"> Messages </h1>
        </>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    [`messages.${ownProps.match.params.ChannelID}`]: state.channel[
      `messages${ownProps.match.params.ChannelID}`
    ],
    [`users.${ownProps.match.params.ChannelID}`]: state.channel[
      `users${ownProps.match.params.ChannelID}`
    ],
    [`times.${ownProps.match.params.ChannelID}`]: state.channel[
      `time${ownProps.match.params.ChannelID}`
    ],
    loading: state.channel.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateDraft: (ChannelID, timestamp) =>
      dispatch(actionCreators.updateDraft(ChannelID, timestamp)),
    postMessage: (message, ChannelID) =>
      dispatch(actionCreators.postMessage(message, ChannelID)),
    makeDraft: ChannelID => dispatch(actionCreators.makeDraft(ChannelID)),
    setLoading: loading => dispatch(actionCreators.setLoading(loading))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagesList);
