import React, { Component } from "react";
import { connect } from "react-redux";

// Actions
import { createChannel } from "../redux/actions/";

class ChannelForm extends Component {
  state = {
    name: "",
    imageUrl: ""
  };

  submitChannel = event => {
    event.preventDefault();
    this.props.createChannel(this.state);
  };

  onTextchange = event =>
    this.setState({ [event.target.name]: event.target.value });

  render() {
    return (
      <div className="mt-5 p-2">
        <form onSubmit={this.submitChannel}>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Channel Name</span>
            </div>
            <input
              type="text"
              className="form-control"
              name="name"
              onChange={this.onTextchange}
            />
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">
                Channel Background Image URL
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              name="imageUrl"
              onChange={this.onTextchange}
            />
          </div>
          <input type="submit" />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  createChannel: channel_name => dispatch(createChannel(channel_name))
});

export default connect(
  null,
  mapDispatchToProps
)(ChannelForm);
