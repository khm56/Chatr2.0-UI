import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../redux/actions";
import ChannelRow from "./ChannelRow";
// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faSignOutAlt,
  faPlusCircle
} from "@fortawesome/free-solid-svg-icons";
import { createChannel } from "../../redux/actions";
import Loading from "../Loading";
// Components

class SideNav extends React.Component {
  state = {
    collapsed: false,
    channelName: "",
    filteredChannels: this.props.channels,
    loading: true
  };
  handleClick() {
    this.props.createChannel(this.state.channelName);
    this.setState({ channelName: "" });
  }
  handleTextChange(e) {
    this.setState({
      channelName: e.target.value
    });
  }
  setLoading(state) {
    this.setState({
      loading: state
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.channels.length != prevProps.channels.length) {
      this.setState({ filteredChannels: this.props.channels });
      if (this.props.channels) {
        this.setLoading(false);
      } else {
        this.setLoading(true);
      }

      // if (this.props.channels.length != prevProps.channels.length || ) {
    }
  }
  componentDidMount() {
    if (this.props.channels.length > 0) {
      this.setLoading(false);
    } else {
      this.setLoading(true);
    }
  }
  renderCreateField() {
    if (this.props.user) {
      return (
        <div className="collapse multi-collapse" id="multiCollapseExample1">
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
      );
    }
  }
  handleSearch(e) {
    let filtered = this.props.channels.filter(chn =>
      chn.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    this.setState({ filteredChannels: filtered });
  }
  getLogOutButton() {
    if (this.props.user) {
      return (
        <>
          <span className=" float-right" onClick={() => this.props.logout()}>
            <FontAwesomeIcon
              icon={faSignOutAlt}
              className="OnClick"
              style={{
                color: "#d0e6ff",
                fontSize: "20px",
                marginBottom: "20px",
                backgroundColor: "transparent"
              }}
            />
          </span>
        </>
      );
    } else {
      return null;
    }
  }
  render() {
    let channelLinks;
    if (this.props.user) {
      channelLinks = this.state.filteredChannels.map(channel => (
        <ChannelRow
          key={channel.name}
          channel={channel}
          channelID={this.props.channelID}
        />
      ));
    }
    let logout = this.getLogOutButton();

    return (
      <div className="col-4" style={{ width: "100%" }}>
        <div className="">
          <div className="row justify-content-center h-100">
            <div className="card mb-sm-3 mb-md-0 contacts_card">
              <div className="card-header">
                <div>
                  <p>
                    {logout}
                    <a
                      data-toggle="collapse"
                      href="#collapseExample"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                      style={{ color: "#d0e6ff" }}
                    >
                      <FontAwesomeIcon
                        icon={faPlusCircle}
                        style={{
                          marginBottom: "10px",
                          fontSize: "20px"
                        }}
                      />
                    </a>
                  </p>
                  <div
                    className="collapse border-bottom mb-2"
                    id="collapseExample"
                  >
                    <input
                      className="form-control mb-2 search  rounded-pill"
                      type="text"
                      onChange={e => this.handleTextChange(e)}
                      value={this.state.channelName}
                      placeholder="Add Channel"
                    ></input>
                    <button
                      className="btn btn-success btn-block mb-2 rounded-pill"
                      onClick={() => this.handleClick()}
                    >
                      Create
                    </button>
                  </div>
                </div>

                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Search for channels.."
                    onChange={e => this.handleSearch(e)}
                    className="form-control search rounded-pill"
                  />
                </div>
              </div>
              {!this.state.loading ? (
                <div className="card-body contacts_body">
                  <ul className="contacts">{channelLinks}</ul>
                </div>
              ) : (
                <Loading />
              )}
            </div>
          </div>
        </div>
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
  logout: () => dispatch(logout()),
  createChannel: name => dispatch(createChannel(name))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideNav);
