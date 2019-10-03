import React from "react";
import { Link } from "react-router-dom";

// Components
import SideNav from "./SideNav";
import AuthButton from "./AuthButton";

const NavBar = () => {
  return (
    <nav
      className="navbar navbar-light"
      style={{ backgroundColor: "#e3f2fd", opacity: 0.3 }}
    >
      <div id="navbarResponsive">
        <AuthButton />
      </div>
    </nav>
  );
};

export default NavBar;
