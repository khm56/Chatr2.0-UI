import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login, signup } from "../redux/actions/";

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
    let checkurl = this.props.match.url.substring(1);
    if (checkurl === "login")
      return this.props.login(this.state, this.props.history);
    else this.props.signup(this.state, this.props.history);
  };

  render() {
    if (this.props.user) return <Redirect to="/channels/" />;
    const type = this.props.match.url.substring(1);
    const errors = this.props.errors;

    //For clean code purposes delete any code you are not using

    // console.log("Broken things " + errors);

    // errors = {
    //   username: ["the username exits"]
    // };
    // <>
    //   <input
    //     type="text"
    //     className={`form-control ${errors.username && "is-invalid"}`}
    //     name="alias"
    //     value={this.state.user.username}
    //     onChange={this.handleChange}
    //   />
    //   <div className="invalid-feedback">{errors.username}</div>
    // </>;

    return (
      <div className="card col-6 mx-auto p-0" style={{ marginTop: "20%" }}>
        <div className="card-body">
          <h4 className="card-title mb-5 mt-1 text-center font-weight-bold ">
            {type === "login"
              ? "Login to view the channels"
              : "Register a user with us!"}
          </h4>
          <form onSubmit={this.submitHandler}>
            <div className="form-group">
              <input
                className={`form-control ${errors && "is-invalid"}`}
                type="text"
                placeholder="Username"
                name="username"
                onChange={this.changeHandler}
              />
            </div>
            <div className="form-group">
              <input
                className={`form-control ${errors && "is-invalid"}`}
                type="password"
                placeholder="Password"
                name="password"
                onChange={this.changeHandler}
              />
              {errors && errors.non_field_errors && (
                <div className="invalid-feedback">
                  {errors.non_field_errors[0]}
                </div>
              )}
            </div>

            <input
              className="btn btn-primary btn-m rounded-pill"
              type="submit"
              value={type.replace(/^\w/, c => c.toUpperCase())}
            />

            {/* <div className="invalid-feedback">{errors.username}</div> */}
          </form>
        </div>
        <div className="card-footer">
          <Link
            to={type === "login" ? "/signup" : "/login"}
            className="btn btn-small btn-link"
          >
            {type === "login"
              ? "Register an account"
              : "Login with an existing account"}
          </Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: (userData, history) => dispatch(login(userData, history)),
  signup: (userData, history) => dispatch(signup(userData, history))
});
const mapStateToProps = state => ({
  user: state.user,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistationForm);
