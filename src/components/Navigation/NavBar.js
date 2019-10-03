import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
// Components
import SideNav from "./SideNav";
import AuthButton from "./AuthButton";

const NavBar = ({ user }) => {
  let result = [
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top"
      id="mainNav"
    >
      <Link className="navbar-brand" to="/welcome">
        Chatr2.0
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
    result = (
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top"
        id="mainNav"
      >
        <Link className="navbar-brand" to="/welcome">
          Chatr2.0
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
  return <div>{result}</div>;
};
const mapStateToProps = state => ({
  user: state.user
});
export default connect(mapStateToProps)(NavBar);
