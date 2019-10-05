import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../redux/actions";
// For clean code Delete anything that is defined but never used
import { css } from "glamor";
import ScrollToBottom from "react-scroll-to-bottom";

import {
  Link,
  DirectLink,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller
} from "react-scroll";

//Components
import MyMessage from "./MyMessage";
import StrangerMessage from "./StrangerMessage";
import AuthButton from "./Navigation/AuthButton";
import { relative } from "path";

let channelName;
let channelImage;
let tempMsgs = [];
class MessagesList extends Component {
  state = { message: "", temp: [] };
  // Remove your console logs after you finish debugging
  componentDidMount() {
    const channel = this.props.match.params.ChannelID;
    this.props.makeDraft(channel);
    Events.scrollEvent.register("end", function() {
      console.log("end", arguments);
      scroll.scrollToBottom();
    });
  }

  componentDidUpdate() {
    let divObj = document.getElementById("msg");
    if (divObj) {
      divObj.scrollTop = divObj.scrollHeight;
    }
    const channel = this.props.match.params.ChannelID;
    const channelArray = this.props.channels.find(
      ch => parseInt(channel) === ch.id
    );
    if (channelArray) {
      channelName = channelArray.name;
      channelImage = channelArray.image_url;
    }
    const channelTimes = this.props[`times.${channel}`];
    const channelMessages = this.props[`messages.${channel}`];
    clearTimeout(this.timerHandle);
    this.timerHandle = 0;
    this.timerHandle = setTimeout(() => {
      if (channelMessages) {
        this.props.setLoading(false);
        if (channelMessages.length) {
          this.setState({ temp: [] });
          // if there is a draft for this channel
          const ts = channelTimes[channelTimes.length - 1]; // get timestamp of latest message in draft
          console.log(ts);
          console.log(channelTimes);
          this.props.updateDraft(channel, ts); // fetch messages after timestamp of 'ts' and concatenate them to draft of this channel
        } else {
          // if there is no draft for this channel, make a new draft
          this.props.makeDraft(channel);
        }
      }
    }, 8000);
  }

  render() {
    const loadingMsg = () => {
      if (this.state.loading) {
        return <h1>Loading...</h1>;
      }
    };
    const channel = this.props.match.params.ChannelID;
    const channelMessages = this.props[`messages.${channel}`];
    const channelUsers = this.props[`users.${channel}`];
    const channelTimes = this.props[`times.${channel}`];

    console.log(this.props.channels);

    let messages;
    let tempMsgs;
    const username = this.props.user.username;

    if (channelMessages) {
      messages = channelMessages.map(function(message, index) {
        if (channelUsers[index] === username) {
          return <MyMessage message={message} time={channelTimes[index]} />;
        } else {
          return (
            <StrangerMessage
              message={message}
              user={channelUsers[index]}
              time={channelTimes[index]}
            />
          );
        }
      });
    }

    const changeHandler = e => {
      this.setState({ [e.target.name]: e.target.value });
    };
    const submitHandler = e => {
      e.preventDefault();
      this.props.postMessage(
        this.state.message,
        this.props.match.params.ChannelID
      );
      console.log(tempMsgs);
      this.setState({ temp: this.state.temp.push(this.state.message) });
      console.log(this.state.temp);
      this.setState({ [e.target.name]: e.target.value, message: "" });
      tempMsgs = <MyMessage message={this.state.message} time={"now"} />;
    };

    let divObj = document.getElementById("msg");
    if (divObj) {
      divObj.scrollTop = divObj.scrollHeight;
    }

    return (
      <>
        <div className="container-fluid"></div>
        <div className="chat" style={{}}>
          <div style={{ height: "1000px" }} className="card">
            <div className="card-header msg_head">
              <div className="d-flex bd-highlight">
                <div className="img_cont">
                  <img
                    src={
                      channelImage
                        ? channelImage
                        : "https://media.licdn.com/dms/image/C4D0BAQHLyZXsUy3iaw/company-logo_200_200/0?e=2159024400&v=beta&t=S_5-JHuojwlJxNHjGWaz1dj5TkdcMOWC9Mm0rzvrYFo"
                    }
                    className="rounded-circle user_img"
                  />
                  {/* <span className="online_icon"></span> */}
                </div>
                <div className="user_info">
                  <span>{channelName}</span>
                  <p>
                    {channelMessages ? channelMessages.length : null} Messages
                  </p>
                </div>
                <div className="video_cam">
                  <span>
                    <i>
                      <AuthButton />
                    </i>
                  </span>
                </div>
              </div>
              <span id="action_menu_btn">
                <i className="fas fa-ellipsis-v"></i>
              </span>
              <div className="action_menu">
                <ul>
                  <li>
                    <i className="fas fa-user-circle"></i> View profile
                  </li>
                  <li>
                    <i className="fas fa-users"></i> Add to close friends
                  </li>
                  <li>
                    <i className="fas fa-plus"></i> Add to group
                  </li>
                  <li>
                    <i className="fas fa-ban"></i> Block
                  </li>
                </ul>
              </div>
            </div>
            <div className="card-body msg_card_body" id="msg">
              {this.props.loading ? (
                <img src="https://static.wixstatic.com/media/c57a1b_3d5a6de9804248a0baabd42c41436c81~mv2.gif" />
              ) : (
                messages.concat(tempMsgs)
              )}
            </div>
            <div className="card-footer">
              <div className="input-group">
                <div className="input-group-append">
                  <span className="input-group-text attach_btn">
                    <i className="fas fa-paperclip"></i>
                  </span>
                </div>
                <input
                  name=""
                  value={this.state.message}
                  className="form-control type_msg"
                  placeholder="Type your message..."
                  onChange={changeHandler}
                  type="text"
                  name="message"
                ></input>
                <div className="input-group-append">
                  <span className="input-group-text send_btn">
                    <i
                      onClick={submitHandler}
                      className="fas fa-location-arrow"
                    ></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* </div>
		</div> */}
      </>
    );
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
    loading: state.channel.loading,
    user: state.user,
    channels: state.channels.channels
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
