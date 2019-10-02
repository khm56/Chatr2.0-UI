import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../redux/actions/index";

class AddMessages extends Component {
  state = {
    message: ""
  };
  textChange = event =>
    this.setState({ [event.target.name]: event.target.value });
  submitChannel = event => {
    event.preventDefault();
    this.props.postOnChannel(this.state, this.props.channelID);
    this.setState({ message: "" });
  };

  render() {
    return (
      <div className="mt-5 p-2">
        <form onSubmit={event => this.submitChannel(event)}>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              name="message"
              value={this.state.message}
              onChange={event => this.textChange(event)}
            />
          </div>
          <input type="submit" />
        </form>
      </div>
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
    postOnChannel: (messages, channelID) =>
      dispatch(actionCreators.postOnChannel(messages, channelID))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMessages);
