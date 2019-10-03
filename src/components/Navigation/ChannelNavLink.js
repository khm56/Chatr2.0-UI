import React from "react";
import { NavLink } from "react-router-dom";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";

const ChannelNavLink = ({ channel }) => {
  return (
    <NavLink
      className="nav-link"
      to={`/channels/${channel.id}`}
      channel={channel}
    >
      <FontAwesomeIcon icon={faComments} />
      <span className="nav-link-text"> {channel.name}</span>
    </NavLink>
  );
};

export default ChannelNavLink;
