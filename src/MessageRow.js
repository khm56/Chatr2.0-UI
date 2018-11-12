import React, { Component } from "react";

class MessageRow extends Component {
  render() {
    const message = this.props.message;
    return (
      <tr>
        <td>{message.username}</td>
        <td>{message.message}</td>
        <td>{message.timestamp}</td>
        {/* <td>
          {book.authors.map(author => (
            <div key={author.name}>{author.name}</div>
          ))}
        </td>
        <td>
          <button className="btn" style={{ backgroundColor: book.color }} />
        </td> */}
      </tr>
    );
  }
}

export default MessageRow;
