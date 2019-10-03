import React from "react";
import moment from "moment";
import { connect } from "react-redux";

function MsgsBox(props) {
  let text = props.text;
  let timestamp = text.timestamp;
  // 2019-09-30T10:45:22.708241Z
  let date = moment(timestamp).fromNow();
  const checkUser = () => {
    if (props.user.username === text.username) {
      return [
        "replies",
        "https://www.pngkey.com/png/detail/115-1150152_default-profile-picture-avatar-png-green.png"
      ];
    } else
      return [
        "sent",
        "https://avatar-cdn.atlassian.com/805e81b11a7b40b833c82c18cc1ca853?d=mm&s=16"
      ];
  };

  return (
    <li className={checkUser()[0]}>
      <img src={checkUser()[1]} alt="" />
      <p>
        <strong>
          {props.user.username === text.username
            ? ": (Me)"
            : `${text.username} :`}
        </strong>
        <br></br>
        <span className="text-dark">{text.message}</span>
        <br></br>
        <br></br>
        <span className="text-warning">{date}</span>
      </p>
    </li>
  );
}

const mapStateToProps = state => ({
  user: state.user
});
export default connect(mapStateToProps)(MsgsBox);
