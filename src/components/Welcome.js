import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const Welcome = ({ user }) => {
  if (user) return <Redirect to="/channels" />;
  return (
    <header className="masthead d-flex">
      <div className="container text-center my-auto z-1">
        <img
          src="https://cdn.dribbble.com/users/2322685/screenshots/6221645/welcome-dribbble.gif"
          className=""
          style={{ marginTop: "-20%" }}
        />

        <h3 className="" style={{ marginTop: "-15%", marginBottom: "3%" }}></h3>

        <Link
          to="/login"
          className=" col-7 btn btn-info rounded-pill btn-lg botn"
        >
          Login
        </Link>
      </div>

      <div className="overlay z-0" />
    </header>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Welcome);
