import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faPlusCircle
} from "@fortawesome/free-solid-svg-icons";

import * as actionCreators from "../../store/actions";
import Loading from "../../Loading";

// Components
import ChannelNavLink from "./ChannelNavLink";

class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { collapsed: false };
  }

  componentDidMount() {
    if (this.props.user) {
      this.props.getChannels();
    }
  }

  componentDidUpdate() {
    if (this.props.user) {
    }
  }

  render() {
    let channelLinks = [];
    if (this.props.user) {
      if (this.props.loading) {
        return <Loading />;
      }
    }
    if (this.props.user) {
      channelLinks = this.props.channels.map(channel => (
        <ChannelNavLink key={channel.name} channel={channel} />
      ));
    }

    return (
      <div>
        <ul
          className="navbar-nav navbar-sidenav"
          id="exampleAccordion"
          style={{ overflowY: "auto" }}
        >
          <li className="nav-item" data-toggle="tooltip" data-placement="right">
            <Link className="nav-link heading" to="/createChannel">
              <span className="nav-link-text mr-2">Channels</span>
              <FontAwesomeIcon icon={faPlusCircle} />
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

const mapStateToProps = state => {
  return {
    user: state.rootAuth.user,
    loading: state.rootChans.loading,
    channels: state.rootChans.channels
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getChannels: () => dispatch(actionCreators.fetchChannels())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SideNav)
);
