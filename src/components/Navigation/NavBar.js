import React from "react";
import { Link } from "react-router-dom";

// Components

import AuthButton from "./AuthButton";

const NavBar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark fixed-top" id="mainNav">
      <Link className="navbar-brand" to="/welcome">
        Chatr2.0
      </Link>
      <AuthButton />
    </nav>
  );
};

export default NavBar;
