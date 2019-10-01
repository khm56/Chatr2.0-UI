import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../../redux/actions";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";

class ChannelNavLink extends Component {
  render(){
  return (
    <>
    <li
      className="nav-item"
      data-toggle="tooltip"
      data-placement="right"
      title={this.props.channel.name}
    >
      <NavLink className="nav-link"  onClick = {() => this.props.fetchMessages(this.props.channel.id)} to={`/channels/${this.props.channel.id}`}>
        <FontAwesomeIcon icon={faHashtag} />
        <span className="nav-link-text" > {this.props.channel.name}</span>
      </NavLink>
    </li>
    </>
  );
};
}




const mapDispatchToProps = dispatch => {
  return {
      fetchMessages: ChannelID => dispatch(actionCreators.fetchMessages(ChannelID))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ChannelNavLink);