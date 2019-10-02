import React from "react";
import moment from "moment";

function MsgsBox(props) {
  let text = props.text;
  let timestamp = text.timestamp;
  // 2019-09-30T10:45:22.708241Z
  let date = moment(timestamp).fromNow();
  return (
    <div key={text.id} className="incoming_msg">
      <div className="incoming_msg_img">
        {" "}
        <img
          src="https://icons-for-free.com/iconfiles/png/512/bot+chat+message+telegram+icon-1320168256174387607.png"
          alt="msg_avatar"
        />{" "}
      </div>
      <div className="received_msg">
        <div className="received_withd_msg">
          <p className="pb-3">
            <strong>{text.username}:</strong>
            <br></br>
            <span className="text-dark">{text.message}</span>
          </p>
          <span className="time_date mb-5">{date}</span>
        </div>
      </div>
    </div>
  );
}

export default MsgsBox;
