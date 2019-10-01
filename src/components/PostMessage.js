import React, { Component } from "react";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { postMessage } from "../redux/actions";

class PostMessage extends Component {
  state = {
    message: ""
  };

  submitMessage(event) {
    event.preventDefault();
    this.props.postMessage(this.state, this.props.channelID);
    this.setState({ message: "" });
  }

  onTextChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    if (!this.props.user) return <Redirect to="/Welcome" />;
    return (
      <form onSubmit={e => this.submitMessage(e)}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="message"
            value={this.state.message}
            placeholder="Type your message here ..."
            onChange={e => this.onTextChange(e)}
          />
        </div>
        <button type="submit" className="btn btn-success">
          Send
        </button>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postMessage: (message, channelID) =>
      dispatch(postMessage(message, channelID))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostMessage);
