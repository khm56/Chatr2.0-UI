import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addChannel } from "../../redux/actions";

// Fontawesomes
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faPlusCircle
} from "@fortawesome/free-solid-svg-icons";

// Components
import ChannelNavLink from "./ChannelNavLink";
import SearchBar from "../SearchBar";

class SideNav extends React.Component {
  state = { collapsed: false };

  render() {
    const channelLinks = this.props.filteredChannels.map(channel => (
      <ChannelNavLink
        key={channel.name}
        channel={channel}
        //onCLick={this.props.fetchMsgs(channel)}
      />
    ));
    return (
      <div>
        {this.props.user ? (
          <div className="pb-1">
            <SearchBar />
            <ul
              className="navbar-nav navbar-sidenav side"
              id="exampleAccordion"
            >
              <li
                className="nav-item"
                data-toggle="tooltip"
                data-placement="right"
              >
                <Link
                  className="nav-link heading channels change_font3"
                  to="/createChannel"
                >
                  <span className="nav-link-text mr-2">Channels</span>
                  <FontAwesomeIcon
                    icon={faPlusCircle}
                    onClick={this.props.addChannel}
                  />
                </Link>
              </li>

              {channelLinks}
            </ul>
            <ul className="navbar-nav sidenav-toggler side">
              <li className="nav-item side">
                <span
                  className="nav-link text-center side"
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
        ) : (
          <ul
            className="navbar-nav navbar-sidenav side"
            id="exampleAccordion"
          ></ul>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    channels: state.channelroot.channels,
    user: state.user,
    filteredChannels: state.channelroot.filteredChannels
  };
};

const mapDispatchToProps = dispatch => ({
  addChannel: userData => dispatch(addChannel(userData))
  //fetchMsgs: channelID => dispatch(fetchMsgs(channelID))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideNav);
