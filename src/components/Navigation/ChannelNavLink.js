import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../../redux/actions";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";

class ChannelNavLink extends Component {
  render() {
    const submitHandler = () => {
      // if there is a draft --> update draft else make draft
      this.props.setLoading(true);
      const channel = this.props.channel.id;
      const channelTimes = this.props[`times.${channel}`];
      const channelMessages = this.props[`messages.${channel}`];
      if (channelMessages) {
        this.props.setLoading(false);
        if (channelMessages.length) {
          this.props.setLoading(false);
          // if there is a draft for this channel
          const ts = channelTimes[channelTimes.length - 1]; // get timestamp of latest message in draft
          this.props.updateDraft(channel, ts); // fetch messages after timestamp of 'ts' and concatenate them to draft of this channel
        } else {
          // if there is no draft for this channel, make a new draft
          this.props.makeDraft(channel);
        }
      } else {
        this.props.makeDraft(channel);
      }
    };
    return (
      <>
        <li
          className="nav-item"
          data-toggle="tooltip"
          data-placement="right"
          title={this.props.channel.name}
        >
          <NavLink
            className="nav-link"
            onClick={submitHandler}
            to={`/channels/${this.props.channel.id}`}
          >
            <FontAwesomeIcon icon={faHashtag} />
            <span className="nav-link-text"> {this.props.channel.name}</span>
          </NavLink>
        </li>
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    [`messages.${ownProps.channel.id}`]: state.channel[
      `messages${ownProps.channel.id}`
    ],
    [`users.${ownProps.channel.id}`]: state.channel[
      `users${ownProps.channel.id}`
    ],
    [`times.${ownProps.channel.id}`]: state.channel[
      `time${ownProps.channel.id}`
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
)(ChannelNavLink);
