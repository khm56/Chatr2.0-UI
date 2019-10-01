import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../../redux/actions";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faPlusCircle,
  faMinusCircle
} from "@fortawesome/free-solid-svg-icons";

// Components
import ChannelNavLink from "./ChannelNavLink";

class SideNav extends React.Component {
  
  state = { 
  collapsed: false,
  channelName: "",
  addMode: false
  };

  render() {
    const channelLinks = this.props.channels.map(channel => (
      <ChannelNavLink key={channel.name} channel={channel} />
    ));

    const sign = () => {
      if(this.state.addMode) return faMinusCircle
      else return faPlusCircle
    }

    const addSign = () => {
      if (this.props.user) return (
        <>
        <span className="nav-link-text mr-2">Channels</span>
        <FontAwesomeIcon icon={sign()} />
        </>
      )
    }

    const addChannelForm = () => {
        if(this.state.addMode){
      return(
                
        <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Channel Name"
                name="channelName"
                onChange={changeHandler}
              />
              <button onClick={submitHandler}>Add</button>
          </div>
      )
        }
    }
    
    const changeHandler = e => {
      this.setState({ [e.target.name]: e.target.value });
    };

    const activateadd = () => {
      this.setState({ addMode: !this.state.addMode });
    }
    const submitHandler = (e) => {
      e.preventDefault();
      this.props.addChannel(this.state.channelName);
      this.setState({ [e.target.name]: e.target.value });
    };

    return (
      <div>
        <ul className="navbar-nav navbar-sidenav" id="exampleAccordion">
          <li className="nav-item" data-toggle="tooltip" data-placement="right">
            <Link className="nav-link heading" onClick={activateadd}>
              {addSign()}
            </Link>
            {addChannelForm()}
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
   channels: state.channels.channels,
   user:state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addChannel: (name) =>
      dispatch(actionCreators.addChannel(name)),
  };
};

export default connect(
  mapStateToProps,mapDispatchToProps
)(SideNav);