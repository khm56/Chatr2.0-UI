import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../../redux/actions";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faPlusCircle,
  faMinusCircle
} from "@fortawesome/free-solid-svg-icons";

// Components
import ChannelNavLink from "./ChannelNavLink";

class test extends React.Component {
  state = {
    channelName: ""
  };
  render() {
    const channelLinks = this.props.channels.map(channel => (
      <ChannelNavLink key={channel.name} channel={channel} />
    ));
    const changeHandler = e => {
      this.setState({ [e.target.name]: e.target.value });
    };
    const submitHandler = e => {
      e.preventDefault();
      this.props.addChannel(this.state.channelName);
      this.setState({ [e.target.name]: e.target.value });
      this.setState({ channelName: "" });
    };

    return (
      <div className="row justify-content-center h-100 ">
        <div className="mx-5 chat">
          <div
            className="card mb-sm-3 mb-md-0 contacts_card"
            style={{ width: 300 }}
          >
            <div className="card-header">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Add Channel"
                  name="channelName"
                  className="form-control search"
                  value={this.state.channelName}
                  onChange={changeHandler}
                />
                <div className="input-group-prepend">
                  <span className="input-group-text search_btn">
                    <i
                      className="fas fa-plus-circle"
                      onClick={submitHandler}
                    ></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="card-body contacts_body">
              <ui className="contacts">{channelLinks}</ui>
            </div>
            <div className="card-footer"></div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    channels: state.channels.channels,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addChannel: name => dispatch(actionCreators.addChannel(name))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(test);
