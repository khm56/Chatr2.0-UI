import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

import "../assets/css/Welcome.css";
const Welcome = ({ user }) => {
  if (user) return <Redirect to="/private" />;
  return (
    <header className="masthead d-flex">
      <div className="container text-center my-auto z-1">
        <div className="bgimg">
          <br></br>
          <br></br>
          <br></br>
          <h1>WELCOME TO CHATR</h1>
          <h3> login to see the Messages</h3>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </div>
        <div className="overlay z-0" />
      </div>
    </header>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Welcome);
