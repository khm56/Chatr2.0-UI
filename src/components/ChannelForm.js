import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import * as actionCreators from "../redux/actions";
import { connect } from "react-redux";


class ChannelForm extends Component {
    state = {
        name: "", //channel name

    };

    componentWillUnmount() {
        if (this.props.errors.length) this.props.resetErrors();
    }

    // handle changes in the form 
    textChangeHandler = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    //used to reset the form 
    resetForm = () => this.setState({
        name: "",
    })

    submitChannel = event => {
        event.preventDefault();
        this.props.postChannel(this.state, this.resetForm, this.props.history);
    };

    render() {
        if (this.props.user === null) return <Redirect to="/" />

        const errors = this.props.errors;

        return (
            <div className="mt-5 p-5">
                <form onSubmit={this.submitChannel}>
                    {!!errors.length && (
                        <div className="alert alert-danger" role="alert">
                            {errors.map(error => (
                                <p key={error}>{error}</p>
                            ))}
                        </div>
                    )}
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text"> Channel Name</span>
                        </div>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={this.state.name}
                            onChange={this.textChangeHandler} />
                    </div>


                    <input
                        type="submit" />
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        errors: state.errors.errors,
        user: state.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        postChannel: (newChannelName, resetForm, history) =>
            dispatch(actionCreators.postChannel(newChannelName, resetForm, history)),
        resetErrors: () => dispatch(actionCreators.resetErrors())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelForm);
