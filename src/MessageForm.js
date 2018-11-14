import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Actions
import * as actionCreators from "./store/actions";

import { faComment, faKeyboard } from "@fortawesome/free-solid-svg-icons";

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
    this.setState({ message: "" });
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
      <form className="form-inline" onSubmit={this.onSubmit}>
        <div className="form-row col">
          <input
            type="text"
            name="message"
            className="form-control col "
            placeholder="Message Name"
            value={this.state.message}
            onChange={this.onTextChange}
          />
          <button type="submit" className=" btn btn-dark border mx-2 ">
            {this.state.message ? (
              <FontAwesomeIcon icon={faComment} />
            ) : (
              <FontAwesomeIcon icon={faKeyboard} />
            )}
          </button>
        </div>
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
