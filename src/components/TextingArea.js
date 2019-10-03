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

    this.setState({ message: " " });

    // console.log(this.props);
  };

  onTextchange = event =>
    this.setState({ [event.target.name]: event.target.value });

  render() {
    return (
      <div
        className=" bg-dark sticky-footer rounded-pill"
        style={{
          padding: "20px",
          marginLeft: "15%",

          marginBottom: "2%",
          fontSize: "1.3em"
        }}
      >
        <form onSubmit={this.submitMsg}>
          <div className="input-group ">
            <input
              type="text"
              name="message"
              value={this.state.message}
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
