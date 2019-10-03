import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createChannel } from "../../redux/actions/";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faCommentMedical
} from "@fortawesome/free-solid-svg-icons";

// Components
import ChannelNavLink from "./ChannelNavLink";
import ChannelForm from "../ChannelForm";

class SideNav extends React.Component {
  state = { collapsed: false };

  render() {
    const channelLinks = () =>
      this.props.channels.channels.map(channel => (
        <tr className="table-hover channels" key={channel.name}>
          <th scope="row" key={channel.name}>
            <ChannelNavLink key={channel.name} channel={channel} />
          </th>
        </tr>
      ));
    return (
      <div className="channelsList">
        {this.props.user ? (
          <table class="table table-hover mt-2">
            <tbody>
              <th scope="col" key>
                <Link className=" heading" to="/channels/create">
                  <span className=" mr-2">New Channel...</span>
                  <FontAwesomeIcon icon={faCommentMedical} />
                </Link>
              </th>

              <tr class="table-active">{channelLinks()}</tr>
            </tbody>
          </table>
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
