import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Welcome extends Component {
  render() {
    let message = () =>
      this.props.user
        ? `Welcome ${this.props.user.username}`
        : "You're gonna need to login to see the messages";
    return (
      <header className="masthead d-flex">
        <div className="container text-center my-auto z-1">
          <h1 className="mb-1">WELCOME TO CHATR</h1>
          <h3 className="mb-5">
            <h1 className="h1">
              {this.props.user ? (
                `${this.props.user.username.toUpperCase()}`
              ) : (
                <div>
                  "You're gonna need to login to see the messages"
                  <div>
                    <Link to="/login" className="btn btn-primary btn-lg">
                      Login
                    </Link>
                  </div>
                </div>
              )}
            </h1>
          </h3>
        </div>
        <div className="overlay z-0" />
      </header>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.rootAuth.user
  };
};

export default connect(mapStateToProps)(Welcome);
