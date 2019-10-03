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
      <div className="card col-6 mx-auto p-0 mt-5 jumbotron">
        <div className="card-body">
          <h4 className="card-title mb-5 mt-1 text-center font-weight-bold ">
            Adding a new channel...
          </h4>
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
                  Channel's Background Image URL
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="https://example.com"
                name="imageUrl"
                onChange={this.onTextchange}
              />
            </div>
            <input
              className="btn btn-outline-success rounded-pill"
              value="Add Channel"
              type="submit"
            />
          </form>
        </div>
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
