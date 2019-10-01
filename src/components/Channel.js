import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetchMessages, sendMessage, fetchMessagesTS } from "../redux/actions";
import Loading from "./Loading";
import Message from "./Message";
// import sad from "../sad.png";
class Channel extends Component {
  state = {
    message: "",
    loading: true,
    channelID: this.props.match.params.channelID
  };

  componentDidMount() {
    this.setState({
      channel: this.props.channels.find(
        chn => chn.id == this.props.match.params.channelID
      )
    });
    if (!this.getChannel.messages)
      this.props.fetchMessages(
        this.props.match.params.channelID,
        status => this.setLoadingFalse(status),
        () => this.scrollToBottom()
      );
    // window.scrollTo(
    //   0,
    //   document.querySelector("#scrollingContainer").scrollHeight
    // );
    this.interval = window.setInterval(() => this.refresh(), 700);
  }
  componentWillUnmount() {
    window.clearInterval(this.interval);
    this.props.resetMessages();
  }
  scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
  }
  refresh() {
    //let date = new Date().toISOString();
    if (this.getChannel().messages && this.getChannel().messages.length > 0) {
      let date = this.getChannel().messages[
        this.getChannel().messages.length - 1
      ].timestamp;
      console.log(date);
      this.props.fetchMessagesTS(this.props.match.params.channelID, date);
    }
    // this.props.fetchMessages(this.props.match.params.channelID);
  }
  componentDidUpdate(prevProps) {
    // if (
    //   prevProps.channels.find(
    //     chn => chn.id == this.props.match.params.channelID.length
    //   ) !== this.state.channel.messages.length
    // ) {
    //   window.scrollTo(0, document.body.scrollHeight);
    // }

    if (prevProps.match.params.channelID != this.props.match.params.channelID) {
      if (!this.getChannel().messages) {
        this.props.fetchMessages(
          this.props.match.params.channelID,
          status => this.setLoadingFalse(status),
          () => this.scrollToBottom()
        );
        window.scrollTo(0, document.body.scrollHeight);
      }
    }
  }
  setLoadingFalse(status) {
    this.setState({
      loading: status
    });
  }
  handleTextChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  sendMessage() {
    this.props.sendMessage(
      this.props.match.params.channelID,
      this.state.message,
      this.props.user.username
    );
    this.setState({
      message: ""
    });
  }
  getChannel() {
    let channel;
    if (this.props.channels) {
      channel = this.props.channels.find(chn => {
        return chn.id == this.props.match.params.channelID;
      });
    }
    if (channel) return channel;
    else return "";
  }
  renderMessages() {
    if (!this.state.loading && this.getChannel().messages) {
      //   window.scrollTo(0, document.body.scrollHeight);

      return (
        <div>
          {this.getChannel().messages.map(msg => (
            <Message message={msg} user={this.props.user.username} />
          ))}
        </div>
      );
    } else {
      return <Loading />;
    }
  }
  //   renderEmptyChat() {
  //     return (
  //       <div className="container">
  //         <img src={sad} className="texts-center" />
  //         <h3>This channel is empty</h3>
  //       </div>
  //     );
  //   }
  render() {
    if (!this.props.user) return <Redirect to="/login" />;
    return (
      <div style={{ marginLeft: "40px" }}>
        <div id="scrollingContainer">{this.renderMessages()}</div>
        {this.state.loading == false ? (
          <>
            <div className="input-group mb-3" style={{ width: "97%" }}>
              <input
                className="form-control"
                placeholder="Type your message here.."
                name="message"
                value={this.state.message}
                onChange={e => this.handleTextChange(e)}
              ></input>

              <div className="input-group-append">
                <button
                  className="btn btn-primary"
                  onClick={() => this.sendMessage()}
                >
                  Send
                </button>
              </div>
            </div>
          </>
        ) : null}
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  fetchMessages: (id, loadingFn, scrollFn) =>
    dispatch(fetchMessages(id, loadingFn, scrollFn)),
  fetchMessagesTS: (id, timestamp) => dispatch(fetchMessagesTS(id, timestamp)),
  sendMessage: (chanID, message, username) =>
    dispatch(sendMessage(chanID, message, username)),
  resetMessages: () => dispatch({ type: "SET_MESSAGES", payload: null })
});
const mapStateToProps = state => ({
  channels: state.channelsReducer.channels,
  user: state.user
  //   messages: state.channelReducer.messages
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channel);
