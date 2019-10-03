import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { auth } from "../redux/actions";
import { Redirect } from "react-router-dom";

import "../assets/css/login.css";
class RegistationForm extends Component {
  state = {
    username: "",
    password: ""
  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitHandler = (e, type) => {
    console.log(this.props.errors);
    e.preventDefault();
    type === "signup"
      ? this.props.signup(this.state, type, this.props.history)
      : this.props.login(this.state, type, this.props.history);
  };

  render() {
    const type = this.props.match.url.substring(1);
    if (this.props.user) return <Redirect to="/private" />;
    return (
      <div className="gifbg">
        <br></br>

        <div className="card col-6 mx-auto p-0 mt-5 text-white bg-dark">
          <div className="card-body">
            <h5 className="card-title mb-4">
              {type === "login"
                ? "Login to send messages"
                : "Register an account"}
            </h5>
            <form onSubmit={e => this.submitHandler(e, type)}>
              <div className="form-group">
                <p>{this.props.errors ? this.props.errors : ""}</p>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Username"
                  name="username"
                  onChange={e => this.changeHandler(e)}
                />
              </div>
              <div className="form-group">
                <p>{this.props.errors ? this.props.errors : ""}</p>
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
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
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
        <br></br>
        <br></br>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  signup: (userData, type, history) =>
    dispatch(auth(userData, "signup", history)),
  login: (userData, type, history) => dispatch(auth(userData, "login", history))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistationForm);
