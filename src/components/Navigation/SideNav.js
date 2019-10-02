import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faPlusCircle
} from "@fortawesome/free-solid-svg-icons";
import { createChannel } from "../../redux/actions";
// Components
import ChannelNavLink from "./ChannelNavLink";

class SideNav extends React.Component {
  state = { collapsed: false, channelName: "" };
  handleClick() {
    // e.preventDefault();
    alert("fdas");
    this.props.createChannel(this.state.channelName);
    this.setState({ channelName: "" });
  }
  handleTextChange(e) {
    this.setState({
      channelName: e.target.value
    });
  }
  renderCreateField() {
    if (this.props.user) {
      return (
        <div class="row">
          <div class="col">
            <div class="collapse multi-collapse" id="multiCollapseExample1">
              <input
                className="form-control mb-1"
                type="text"
                onChange={e => this.handleTextChange(e)}
                value={this.state.channelName}
              ></input>
              <button
                className="btn btn-success btn-block"
                onClick={() => this.handleClick()}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
  render() {
    let channelLinks;
    if (this.props.user) {
      channelLinks = this.props.channels.map(channel => (
        <ChannelNavLink key={channel.name} channel={channel} />
      ));
    }
    const buttonText = this.props.user
      ? "Create Channel"
      : "Login to create channels";
    return (
      <div>
        <ul className="navbar-nav navbar-sidenav" id="exampleAccordion">
          <li className="nav-item" data-toggle="tooltip" data-placement="right">
            <Link
              className="nav-link heading"
              to={!this.props.user ? "/login" : null}
            >
              <p>
                {this.props.user ? (
                  <>
                    <a
                      className="btn btn-secondary"
                      data-toggle="collapse"
                      href="#multiCollapseExample1"
                      role="button"
                      aria-expanded="false"
                      aria-controls="multiCollapseExample1"
                    >
                      <span className="nav-link-text mr-2">{buttonText}</span>
                      {this.props.user && (
                        <FontAwesomeIcon icon={faPlusCircle} />
                      )}
                    </a>
                  </>
                ) : (
                  <p>Login please</p>
                )}
              </p>
              {this.renderCreateField()}
            </Link>
          </li>
          {channelLinks}
        </ul>
        <ul className="navbar-nav sidenav-toggler">
          <li className="nav-item">
            <span
              className="nav-link text-center"
              id="sidenavToggler"
              onClick={() =>
                this.setState(prevState => ({
                  collapsed: !prevState.collapsed
                }))
              }
            >
              <FontAwesomeIcon
                icon={this.state.collapsed ? faAngleRight : faAngleLeft}
              />
            </span>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  channels: state.channelsReducer.channels,
  errors: state.errors.errors,
  user: state.user
});
const mapDispatchToProps = dispatch => ({
  createChannel: name => dispatch(createChannel(name))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideNav);
