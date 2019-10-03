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
      <>
        {!this.props.user &&
          <>
            <header id="head" className="masthead  d-flex"
            >
              <div id="head" className="container text-center  text-dark my-auto z-1">
                <h1 id="welcome" className="m-5 animated infinite bounceOut slower delay-2s">WELCOME TO CHATR</h1>

                <h3 className="mb-5">
                  <em id="welcome"  >Login to see the messages</em>
                </h3>
                <Link id="welcomelogin" to="/login" className="btn rounded-pill">
                  Login
        </Link>
              </div>
            </header>
          </>
        }
        <div className="overlay z-0" />



      </>
    );

  }
};


const mapStateToProps = state => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps)(Welcome);