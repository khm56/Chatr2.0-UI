import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetchMessages, sendMessage, fetchMessagesTS } from "../redux/actions";
import { emojify } from "react-emojione";
import Loading from "./Loading";
import Message from "./Message";
import SideNav from "../components/Navigation/SideNav";
import empty from "../empty.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationArrow,
  faEllipsisV,
  faSmile
} from "@fortawesome/free-solid-svg-icons";

import EmojiPicker from "emojione-picker";
// import sad from "../sad.png";
class Channel extends Component {
  state = {
    message: "",
    loading: true,
    channelID: this.props.match.params.channelID,
    query: ""
  };

  componentDidMount() {
    if (!this.getChannel().messages && this.props.match.params.channelID)
      this.props.fetchMessages(
        this.props.match.params.channelID,
        status => this.setLoadingFalse(status),
        () => this.scrollToBottom()
      );

    if (this.props.match.params.channelID) {
      this.interval = window.setInterval(() => this.refresh(), 1000);
    }
  }

  scrollToBottom() {
    this.refs.msgs_body.scrollTo(0, this.refs.msgs_body.scrollHeight);
  }
  refresh() {
    //let date = new Date().toISOString();
    if (this.state.loading == false) {
      if (this.getChannel().messages && this.getChannel().messages.length > 0) {
        let date = this.getChannel().messages[
          this.getChannel().messages.length - 1
        ].timestamp;
        console.log(date);
        this.props.fetchMessagesTS(this.props.match.params.channelID, date);
      } else {
        // let date = new Date().toISOString();
        // this.props.fetchMessagesTS(this.props.match.params.channelID, date);
        this.props.fetchMessages(this.props.match.params.channelID, null, () =>
          this.scrollToBottom()
        );
      }
    }
    // this.props.fetchMessages(this.props.match.params.channelID);
  }
  componentWillUnmount() {
    window.clearInterval(this.interval);
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
      this.interval = window.setInterval(() => this.refresh(), 1000);
      this.refs.msgs_body.scrollTo(0, this.refs.msgs_body.scrollHeight);
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
      return (
        <div>
          {this.FilterMSG().map((msg, idx) => (
            <Message
              message={msg}
              user={this.props.user.username}
              key={msg.id + idx + Math.random() * 1111}
            />
          ))}
        </div>
      );
    } else {
      return <Loading />;
    }
  }
  emojieClicked(data) {
    // e.stopPropagation();
    // emojify("Easy! :wink: :D ^__^", { output: "unicode" });
    let newInputText =
      this.state.message + emojify(data.shortname, { output: "unicode" });
    this.setState({
      message: newInputText
    });
  }

  FilterMSG() {
    if (this.getChannel().messages) {
      let filtered = this.getChannel().messages.filter(
        chn =>
          chn.message.toLowerCase().includes(this.state.query.toLowerCase()) ||
          chn.username.toLowerCase().includes(this.state.query.toLowerCase())
      );
      return filtered;
    }
  }
  handleSearchMSG(e) {
    this.setState({ query: e.target.value });
  }
  // Clean code but this component is doing way too much
  render() {
    let isThereAnID;
    if (!this.props.user) return <Redirect to="/login" />;
    if (this.props.match.params.channelID) isThereAnID = true;
    else isThereAnID = false;
    const channel = this.getChannel();
    let usernames;
    if (channel.messages) {
      usernames = channel.messages.map(msg => {
        return msg.username;
      });
      usernames = [...new Set(usernames)];
    }
    return (
      <div className="row justify-content-center">
        <SideNav channelID={this.props.match.params.channelID} />
        {isThereAnID && (
          <div className="col-8 chat">
            <div className="card">
              <div className="card-header msg_head">
                <div className="d-flex bd-highlight">
                  <div className="img_cont">
                    <img
                      src={channel.image_url ? channel.image_url : empty}
                      className="rounded-circle user_img"
                    />
                  </div>
                  <div className="user_info">
                    <span>{channel.name}</span>

                    <p style={{ fontSize: "15px", width: "200px" }}>
                      {channel.messages
                        ? `${channel.messages.length} messages from ${usernames.length} users`
                        : null}
                    </p>
                  </div>
                  <div
                    className="input-group"
                    style={{ width: "250px", marginLeft: "200px" }}
                  >
                    <input
                      type="text"
                      placeholder="Search for messages.."
                      onChange={e => this.handleSearchMSG(e)}
                      className="form-control search rounded-pill"
                    />
                  </div>
                </div>
              </div>
              <div className="card-body msg_card_body" ref="msgs_body">
                {this.renderMessages()}
              </div>
              <div className="card-footer">
                <form onSubmit={e => this.sendMessage(e)}>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div class="btn-group dropup">
                        <span
                          className="input-group-text send_btn3 "
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <FontAwesomeIcon icon={faSmile} />
                        </span>
                        <div class="dropdown-menu">
                          <EmojiPicker
                            onChange={data => this.emojieClicked(data)}
                          />
                        </div>
                      </div>
                    </div>
                    <input
                      name="message"
                      className="form-control type_msg"
                      placeholder="Type your message..."
                      value={this.state.message}
                      onChange={e => this.handleTextChange(e)}
                    ></input>

                    <div className="input-group-append">
                      <span
                        className="input-group-text send_btn"
                        onClick={e => this.sendMessage(e)}
                      >
                        <input type="submit" hidden />{" "}
                        <FontAwesomeIcon icon={faLocationArrow} />
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
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
  newMessage: state.channelsReducer.newMessage,
  visited: state.channelsReducer.visited
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channel);
