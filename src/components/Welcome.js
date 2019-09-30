import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import main from "../assets/js/main";

class Welcome extends Component {
  // componentDidMount() {
  //   main();

  // }
  render() {

    return (
      <header className="masthead d-flex">
        <div className="container text-center text-white my-auto z-1">
          <h1 className="m-5">WELCOME TO CHATR</h1>
          {!this.props.user &&
            <>
              <h3 className="mb-5">
                <em>Login to see the messages</em>
              </h3>
              <Link to="/login" className="btn btn-primary btn-lg rounded-pill">
                Login
        </Link>
            </>
          }
        </div>
        <div className="overlay z-0" />
      </header>
    );

  }
};


const mapStateToProps = state => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps)(Welcome);