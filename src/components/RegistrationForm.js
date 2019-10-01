import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../redux/actions";

class RegistationForm extends Component {
  state = {
    username: "",
    password: ""
  };

  
  componentWillUnmount() {
    if (this.props.errors){
      this.props.resetErrors();
    } 
    this.props.fetchChannels()
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (e,type) => {
    e.preventDefault();
    if(type==="signup")
    this.props.signup(this.state, this.props.history);
    else 
    this.props.login(this.state, this.props.history)
  };

  render() {
    if (this.props.user) return <Redirect to="/welcome" /> 
    const type = this.props.match.url.substring(1);
  

    const submit = (event) =>{
      this.submitHandler(event,type);
      
    }

    return (
      <div className="card col-6 mx-auto p-0 mt-5">
        <div className="card-body">
          <h5 className="card-title mb-4">
            {type === "login"
              ? "Login to send messages"
              : "Register an account"}
          </h5>
          <form onSubmit={submit}>
          <p style={{color: "red" }}>  {this.props.errors.username}</p>
          <p style={{color: "red" }}>  {this.props.errors.non_field_errors}</p>
        

            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Username"
                name="username"
                onChange={this.changeHandler}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="password"
                placeholder="Password"
                name="password"
                onChange={this.changeHandler}
              />
            </div>
            <input
              className="btn btn-primary"
              type="submit"
              value={type.replace(/^\w/, c => c.toUpperCase())}
            />
          </form>
        </div>
        <div className="card-footer">
          <Link
            to={type === "login" ? "/signup" : "/login"}
            className="btn btn-small btn-link"
          >
            {type === "login"
              ? "register an account"
              : "login with an existing account"}
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    errors: state.errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signup: (userData, history) =>
      dispatch(actionCreators.signup(userData, history)),
    login: (userData, history) =>
      dispatch(actionCreators.login(userData, history)),
    resetErrors: () => dispatch(actionCreators.resetErrors()),
    fetchChannels: () => dispatch(actionCreators.fetchChannels())
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistationForm);
