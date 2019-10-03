import React from "react";
import { Link } from "react-router-dom";

// Components

import AuthButton from "./AuthButton";

const NavBar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg  navbar-dark bg-dark fixed-top"
      id="mainNav"
    >
      <Link
        className="navbar-brand"
        style={{ fontSize: "1.7em" }}
        to="/welcome"
      >
        Chatr2.0
      </Link>
      <button
        className="navbar-toggler collapsed"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor01"
        aria-controls="navbarColor01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="navbar-collapse collapse" id="navbarColor01">
        <ul className="navbar-nav ml-auto" style={{ fontSize: "1.3em" }}>
          <AuthButton />
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
