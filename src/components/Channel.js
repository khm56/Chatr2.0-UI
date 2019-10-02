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
    if (!this.getChannel.messages)
      this.props.fetchMessages(
        this.props.match.params.channelID,
        status => this.setLoadingFalse(status),
        () => this.scrollToBottom()
      );
    // this.setState({
    //   message: ""
    // });
    this.interval = window.setInterval(() => this.refresh(), 1000);
  }
  componentWillUnmount() {
    // this.props.resetMessages();
  }
  scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
  }
  refresh() {
    //let date = new Date().toISOString();
    if (this.state.loading == false) {
      if (this.getChannel().messages && this.getChannel().messages.length > 0) {
        let date = this.getChannel().messages[
          this.getChannel().messages.length - 1
        ].timestamp;

        this.props.fetchMessagesTS(this.props.match.params.channelID, date);
      } else {
        // let date = new Date().toISOString();
        // this.props.fetchMessagesTS(this.props.match.params.channelID, date);
        this.props.fetchMessages(this.props.match.params.channelID, null, () =>
          this.scrollToBottom()
        );
        console.log(this.props.messages);
      }
    }
    // this.props.fetchMessages(this.props.match.params.channelID);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.match.params.channelID != this.props.match.params.channelID) {
      if (!this.getChannel().messages) {
        this.props.fetchMessages(
          this.props.match.params.channelID,
          status => this.setLoadingFalse(status),
          () => this.scrollToBottom()
        );
      }
      this.props.saveDraft(
        this.state.message,
        prevProps.match.params.channelID
      );
      if (this.getChannel().draft) {
        this.setState({
          message: this.getChannel().draft
        });
      } else {
        this.setState({
          message: ""
        });
      }
      window.clearInterval(this.interval);
      window.scrollTo(0, document.body.scrollHeight);
    }
    if (this.props.newMessage) {
      this.scrollToBottom();
      this.props.setNewMessageToFalse();
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
  sendMessage(e) {
    e.preventDefault();
    this.props.sendMessage(
      this.props.match.params.channelID,
      this.state.message,
      this.props.user.username
    );
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
            <Message
              message={msg}
              user={this.props.user.username}
              key={msg.id}
            />
          ))}
        </div>
      );
    } else {
      return <Loading />;
    }
  }

  render() {
    if (!this.props.user) return <Redirect to="/login" />;
    return (
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${
            this.getChannel().image_url
          })`,
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundSize: "1365px 1000px"
        }}
      >
        <div id="scrollingContainer">{this.renderMessages()}</div>
        {this.state.loading == false ? (
          <>
            <form onSubmit={e => this.sendMessage(e)}>
              <div
                className="input-group  mb-3 fixedInput"
                style={{
                  width: "75%",
                  marginRight: "40px",
                  height: "60px"
                }}
              >
                <input
                  className="form-control"
                  placeholder="Type your message here.."
                  name="message"
                  value={this.state.message}
                  onChange={e => this.handleTextChange(e)}
                  style={{ height: "60px" }}
                ></input>

                <div className="input-group-append">
                  <button
                    className="btn btn-danger"
                    style={{ backgroundColor: "#d62929" }}
                    type="submit"
                  >
                    Send
                  </button>
                </div>
              </div>
            </form>
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
  //   resetMessages: () => dispatch({ type: "SET_MESSAGES", payload: null }),
  setNewMessageToFalse: () => dispatch({ type: "SET_NEW_MESSAGE_FALSE" }),
  saveDraft: (payload, channelID) =>
    dispatch({ type: "SAVE_DRAFT", payload: payload, channelID: channelID })
});
const mapStateToProps = state => ({
  channels: state.channelsReducer.channels,
  user: state.user,
  newMessage: state.channelsReducer.newMessage
  //   messages: state.channelReducer.messages
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channel);
