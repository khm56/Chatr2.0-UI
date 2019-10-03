import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { login, signup } from "../redux/actions";

class RegistationForm extends Component {
  state = {
    username: "",
    password: ""
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (e, type) => {
    e.preventDefault();
    if (type === "login") {
      this.props.login(this.state, this.props.history);
    } else {
      this.props.signup(this.state, this.props.history);
    }
  };

  render() {
    const type = this.props.match.url.substring(1);
    return (
      <div className="card col-6 mx-auto p-0 mt-5">
        <div className="card-body bg-dark text-light">
          <h5 className="card-title mb-4">
            {type === "login"
              ? "Login to send messages"
              : "Register an account"}
          </h5>
          <form onSubmit={event => this.submitHandler(event, type)}>
            <div className="form-group">
              <p className="color">
                {this.props.errors ? this.props.errors : ""}
              </p>
              <input
                className="form-control"
                type="text"
                placeholder="Username"
                name="username"
                onChange={this.changeHandler}
              />
            </div>
            <div className="form-group">
              <p className="color">
                {this.props.errors ? this.props.errors : ""}
              </p>
              <input
                className="form-control"
                type="password"
                placeholder="Password"
                name="password"
                onChange={this.changeHandler}
              />
            </div>
            <p className="color">
              {/* {this.props.errors ? this.props.errors : ""} */}
            </p>
            <input
              className="btn btn-primary"
              type="submit"
              value={type.replace(/^\w/, c => c.toUpperCase())}
            />
          </form>
        </div>
        {/* <p className="color">{this.props.errors ? this.props.errors : ""}</p> */}
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
    login: (userData, history) => dispatch(login(userData, history)),
    signup: (userData, history) => dispatch(signup(userData, history))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistationForm);
