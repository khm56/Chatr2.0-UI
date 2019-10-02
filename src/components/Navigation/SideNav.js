import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { fetchChannels } from "../../redux/actions";
import SearchBar from "./SearchBar";
// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faPlusCircle
} from "@fortawesome/free-solid-svg-icons";

// Components
import ChannelNavLink from "./ChannelNavLink";
// import { from } from "rxjs";

class SideNav extends React.Component {
  state = { collapsed: false };

  // componentDidMount() {
  //   this.props.fetchSelectedChannel(this.props.match.params.channelID);
  // }
  render() {
    const filteredChannels = this.props.filteredChannels.map(channel => (
      <ChannelNavLink key={channel.id} channel={channel} />
    ));
    // const channelLinks = this.props.channels.map(channel => (
    //   <ChannelNavLink key={channel.id} channel={channel} />
    // ));
    if (!this.props.user) return <Redirect to="/welcome" />;
    return (
      <div>
        <ul className="navbar-nav navbar-sidenav" id="exampleAccordion">
          <li className="nav-item" data-toggle="tooltip" data-placement="right">
            <Link className="nav-link heading" to="/createChannel">
              <span className="nav-link-text mr-2">AddChannel</span>
              <FontAwesomeIcon icon={faPlusCircle} />
            </Link>
            <SearchBar /> {filteredChannels}
          </li>
          {/* {channelLinks} */}
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
    user: state.user,
    channels: state.rootChannel.channels,
    filteredChannels: state.rootChannel.filteredChannels
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchChannels: () => dispatch(fetchChannels())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideNav);
