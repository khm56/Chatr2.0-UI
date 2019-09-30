import React, { Component } from "react";
import { Link} from "react-router-dom";
import { connect } from "react-redux";

class Welcome extends Component {
  render(){
    const display = () => {
      if(this.props.user){
        return (
          <h1 className="mb-1">WELCOME TO CHATR ACCESS CHANNELS ON THE LEFT</h1>
        )
        }else {
        return(
          <>
        <h1 className="mb-1">WELCOME TO CHATR</h1>
        <h3 className="mb-5">
          <em>You're gonna need to login to see the messages</em>
        </h3>
        <Link to="/login" className="btn btn-primary btn-lg">
          Login
        </Link>
        </>
        )
    }
  }
  return (
    <header className="masthead d-flex">
      <div className="container text-center my-auto z-1">
        {display()}
      </div>
      <div className="overlay z-0" />
    </header>
  );
};
}


const mapStateToProps = state => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps)(Welcome);