import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as actionCreators from "../redux/actions";
import { connect } from "react-redux";

class LoginForm extends Component {
    state = {
        username: "",
        password: ""
    };

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    submitHandler = e => {
        e.preventDefault();

        this.props.login(this.state);

    };

    render() {
        const type = this.props.match.url.substring(1);
        return (
            <div className="card col-6 mx-auto p-0 mt-5">
                <div className="card-body">
                    <h5 className="card-title mb-4">
                        Login
          </h5>
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
                        to="/signup"
                        className="btn btn-small btn-link">

                        Create an account
                    </Link>

                </div>
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        login: userData => dispatch(actionCreators.login(userData))

    };
};

export default connect(null, mapDispatchToProps)(LoginForm);