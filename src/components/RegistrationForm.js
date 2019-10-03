import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { signup, login, resetErrors } from "../redux/actions";
import { connect } from "react-redux";
class RegistationForm extends Component {
  state = {
    username: "",
    password: ""
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {
    e.preventDefault();
    const type = this.props.match.url.substring(1);
    if (type === "login") {
      this.props.login(this.state, this.props.history);
    } else if (type === "signup") {
      this.props.signup(this.state, this.props.history);
    }
  };
  componentWillUnmount() {
    if (this.props.errors.length) this.props.resetErrors();
  }

  render() {
    const type = this.props.match.url.substring(1);
    const errors = this.props.errors;
    console.log(errors);
    if (this.props.user) return <Redirect to="/channel" />;
    return (
      <div className="card col-6 mx-auto p-0 mt-5">
        <div className="card-body">
          <h5 className="card-title mb-4">
            {type === "login"
              ? "Login to send messages"
              : "Register an account"}
          </h5>
          {!!errors.length && (
            <div className="alert alert-danger" role="alert">
              {errors.map(error => (
                <li key={error}>{error.split(":")[1]}</li>
              ))}
            </div>
          )}

          <form onSubmit={this.submitHandler}>
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
const mapDispatchToProps = dispatch => ({
  signup: (userData, history) => dispatch(signup(userData, history)),
  login: (userData, history) => dispatch(login(userData, history)),
  resetErrors: () => dispatch(resetErrors())
});
const mapStateToProps = state => ({
  user: state.user,
  errors: state.errors.errors
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistationForm);
