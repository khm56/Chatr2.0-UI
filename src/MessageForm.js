import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

// Actions
import * as actionCreators from "./store/actions";

class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      username: this.props.user.username
    };
    this.onTextChange = this.onTextChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onTextChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.postMessage(this.props.channel, this.state);
  }

  componentDidUpdate() {
    if (this.props.user) {
    }
  }

  render() {
    if (!this.props.user) {
      return <Redirect to="/" />;
    }
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          name="message"
          placeholder="Message Name"
          onChange={this.onTextChange}
        />
        <input type="submit" value="Add Message" />
      </form>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.rootAuth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postMessage: (message, channelID) =>
      dispatch(actionCreators.postMessage(channelID, message))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageForm);
