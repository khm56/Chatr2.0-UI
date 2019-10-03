import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../redux/actions/index";
class AddChannel extends Component {
  state = {
    name: "",
    image_url: ""
  };

  textChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  submitChannel = event => {
    event.preventDefault();
    this.props.postChannel(this.state, this.props.history);
  };
  render() {
    return (
      <div
        className="mt-5 p-2 card col-8 bg-dark text-light"
        style={{ marginLeft: "150px" }}
      >
        {!!this.props.user && (
          <form onSubmit={this.submitChannel}>
            <p className="font">Create Channel</p>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">Name</span>
              </div>
              <input
                type="text"
                className="form-control"
                name="name"
                onChange={this.textChange}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">Image URL</span>
              </div>
              <input
                type="text"
                className="form-control"
                name="image_url"
                onChange={this.textChange}
              />
            </div>
            <input type="submit" className="btn btn-success" />
          </form>
        )}
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
    postChannel: (channel, history) =>
      dispatch(actionCreators.postChannel(channel, history))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddChannel);
