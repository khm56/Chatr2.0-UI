import React from 'react';

// Components
import SideNav from './SideNav';

function NavBar(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
      <a className="navbar-brand" href="index.html">Chatr2.0</a>
      <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarResponsive">
        <SideNav />
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" data-toggle="modal" data-target="#exampleModal">
              <i className="fa fa-fw fa-sign-out"></i>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;