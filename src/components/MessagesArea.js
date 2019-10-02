import React from "react";
import moment from "moment";

function MsgsBox(props) {
  let text = props.text;
  let timestamp = text.timestamp;
  // 2019-09-30T10:45:22.708241Z
  let date = moment(timestamp).fromNow();
  return (
    <div className="incoming_msg">
      <div className="received_msg">
        <div className="received_withd_msg">
          <p className="pb-3">
            <strong>{text.username}:</strong>
            <br></br>
            <span className="text-dark">{text.message}</span>
          </p>
          <span className="time_date">{date}</span>
        </div>
      </div>
    </div>
  );
}

export default MsgsBox;
