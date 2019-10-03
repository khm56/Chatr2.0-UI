import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import AuthButton from "./Navigation/AuthButton";

class Welcome extends Component {
  render() {
    const display = () => {
      if (this.props.user) {
        return (
          <>
            <h1 className="mb-1">
              <img src="https://en.bloggif.com/tmp/4689d7b08aec22019b0c5de9637ae658/text.gif?1570067827" />
            </h1>
          </>
        );
      } else {
        return (
          <>
            <img src="https://en.bloggif.com/tmp/4689d7b08aec22019b0c5de9637ae658/text.gif?1570067827" />
            <h3 className="mb-5" style={{ color: "blue" }}>
              <img src="https://en.bloggif.com/tmp/4689d7b08aec22019b0c5de9637ae658/text.gif?1570067520" />
            </h3>
          </>
        );
      }
    };
    return (
      <header className="masthead d-flex">
        <div className="container text-center my-auto z-1">
          {display()}
          <img
            style={{ width: 500 }}
            src="http://cdn130.picsart.com/295059463145201.gif"
          />
        </div>
        <div className="overlay z-0" />
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};
export default connect(mapStateToProps)(Welcome);
