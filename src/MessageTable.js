import React, { Component } from "react";

import MessageRow from "./MessageRow";
import { connect } from "react-redux";
import Loading from "./Loading";

import * as actionCreators from "./store/actions/index";

class MessageTable extends Component {
  componentDidMount() {
    console.log(this.props.channel);
  }
  componentDidUpdate() {
    console.log(this.props.channel);
  }
  render() {
    if (this.props.loading) {
      return <Loading />;
    }
    const messageRows = this.props.channel.map(message => (
      <MessageRow key={message.message + message.id} message={message} />
    ));

    return (
      <table className="mt-3 table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>{messageRows}</tbody>
      </table>
    );
  }
}

export default MessageTable;
