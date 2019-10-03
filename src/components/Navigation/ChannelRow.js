import React, { Component } from "react";
import empty from "../../empty.jpg";
import { Link } from "react-router-dom";
export default class ChannelRow extends Component {
  render() {
    const unreadValue =
      this.props.channel.unread && this.props.channel.unread > 0
        ? this.props.channel.unread
        : null;
    return (
      <Link to={`/channel/${this.props.channel.id}`} className="plainHover">
        <li
          className={
            this.props.channelID == this.props.channel.id
              ? "active"
              : "notActive"
          }
        >
          <div className="d-flex bd-highlight">
            <div className="img_cont">
              <img
                src={
                  this.props.channel.image_url
                    ? this.props.channel.image_url
                    : empty
                }
                className="rounded-circle user_img"
              />
            </div>
            <div className="row justify-content-between">
              <div className="col">
                <div className="user_info">
                  <span>{this.props.channel.name}</span>
                </div>
              </div>
              <div className="col">
                <span class="badge badge-primary">{unreadValue}</span>
              </div>
            </div>
          </div>
        </li>
      </Link>
    );
  }
}
