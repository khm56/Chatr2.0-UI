import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createChannel } from "../../redux/actions/";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faPlusCircle
} from "@fortawesome/free-solid-svg-icons";

// Components
import ChannelNavLink from "./ChannelNavLink";
import ChannelForm from "../ChannelForm";

class SideNav extends React.Component {
  state = { collapsed: false };

  render() {
    const channelLinks = () =>
      this.props.channels.channels.map(channel => (
        <ChannelNavLink key={channel.name} channel={channel} />
      ));
    return (
      <div className="channelsList">
        {this.props.user ? (
          <>
            <Link className=" heading" to="/channels/create">
              <span className=" mr-2">Channels</span>
              <FontAwesomeIcon icon={faPlusCircle} />
            </Link>

            <> {channelLinks()}</>
          </>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  channels: state.channels
});

export default connect(mapStateToProps)(SideNav);
