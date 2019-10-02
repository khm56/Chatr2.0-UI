import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faPlusCircle
} from "@fortawesome/free-solid-svg-icons";

// Components
import ChannelNavLink from "./ChannelNavLink";
import Loading from "../Loading";

import { fetchChannels } from "../../redux/actions";

import Searchbar from "../Searchbar";

class SideNav extends React.Component {
  state = { collapsed: false };

  componentDidMount() {
    this.props.fetchChannels();
  }

  render() {
    const channelLinks = this.props.filteredChannels.map(channel => (
      <ChannelNavLink key={channel.name} channel={channel} />
    ));
    if (!this.props.user) return <Redirect to="/welcome" />;

    return (
      <div>
        <ul className="navbar-nav navbar-sidenav" id="exampleAccordion">
          <li className="nav-item" data-toggle="tooltip" data-placement="right">
            <Link className="nav-link heading" to="/channels/create">
              <span className="nav-link-text mr-2">Channels</span>
              <FontAwesomeIcon icon={faPlusCircle} />
            </Link>
            <Searchbar />
            {this.props.loading ? <Loading /> : channelLinks}
          </li>
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
  user: state.user,
  channels: state.rootChannels.channels,
  loading: state.rootChannels.loading,
  filteredChannels: state.rootChannels.filteredChannels
});

const mapDispatchToProps = dispatch => {
  return {
    fetchChannels: () => dispatch(fetchChannels())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideNav);
