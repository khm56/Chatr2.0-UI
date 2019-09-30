import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../redux/actions";


class MessagesList extends Component {
    render(){
    const messages = this.props.messages.map(message => (
        message
      ));
    return(
        <>
        <h1 className="my-2 mx-5"> Messages </h1>
        {messages}
        </>
    )
    }
    
}

const mapStateToProps = state => {
    return {
     messages: state.channel.messages
    };
  };
  
  
  export default connect(
    mapStateToProps,
  )(MessagesList);