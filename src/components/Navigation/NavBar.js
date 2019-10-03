import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// Components
import SideNav from "./SideNav";
import AuthButton from "./AuthButton";

const NavBar = ({ user }) => {
  let Nav = [
    <nav
      className="navbar navbar-expand-lg navbar-light fixed-top"
      id="mainNav"
      style={{ backgroundColor: "rgb(52,63,97)" }}
    >
      <Link className="navbar-brand text-light" to="/welcome">
        CHATTER
      </Link>
      <button
        className="navbar-toggler navbar-toggler-right"
        type="button"
        data-toggle="collapse"
        data-target="#navbarResponsive"
        aria-controls="navbarResponsive"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarResponsive">
        <AuthButton />
      </div>
    </nav>
  ];
  if (!!user) {
    Nav = (
      <nav
        className="navbar navbar-expand-lg navbar-light fixed-top"
        id="mainNav"
        style={{ backgroundColor: "rgb(52,63,97)" }}
      >
        <Link className="navbar-brand text-light" to="/welcome">
          {" "}
          CHATTER
        </Link>
        <button
          className="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <SideNav />
          <AuthButton />
        </div>
      </nav>
    );
  }
  return <div>{Nav}</div>;
};
const mapStateToProps = state => {
  return {
    user: state.user
  };
};
export default connect(mapStateToProps)(NavBar);
