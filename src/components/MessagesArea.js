import React from "react";

function MsgsBox(props) {
  let text = props.text;
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
          <span className="time_date mb-5">{text.timestamp}</span>
        </div>
      </div>
    </div>
  );
}

export default MsgsBox;
