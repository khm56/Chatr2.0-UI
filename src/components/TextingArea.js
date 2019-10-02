import React, { Component } from "react";
import { connect } from "react-redux";

// Actions
import { postMsg } from "../redux/actions/";

class TextingArea extends Component {
  state = {
    message: ""
  };

  submitMsg = event => {
    event.preventDefault();

    this.props.postMsg(
      this.props.channelID,
      this.state,
      this.props.user.username
    );
    // console.log(this.props);
  };

  onTextchange = event =>
    this.setState({ [event.target.name]: event.target.value });

  render() {
    return (
      <div
        className="texted bg-dark text-center fixed-bottom  p-3 "
        style={{ marginLeft: "14.2%", width: "85.75%" }}
      >
        <form onSubmit={this.submitMsg}>
          <div className="input-group mb-3">
            <input
              type="text"
              name="message"
              className="form-control rounded-pill "
              placeholder="Type a message..."
              onChange={this.onTextchange}
            />
            <div className="input-group-append ">
              <input
                className="btn btn-primary rounded-pill ml-2"
                type="submit"
                value="Post"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  postMsg: (channelID, msg, user) => dispatch(postMsg(channelID, msg, user))
});
const mapStateToProps = state => ({
  user: state.user
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TextingArea);
