import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const SuperSecretPage = ({ user }) => {
  if (!user) return <Redirect to="/login" />;

  return (
    <div className="p-4 text-center change_font1">
      <h1>This Page Has All The Secrets</h1>
      <p>Now That You're Logged In You Can See This Page</p>
      <img
        src="https://static.collectui.com/shots/3295528/data-transfer-large"
        style={{
          width: "60%",
          paddingTop: 0,
          paddingBottom: 0
        }}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(SuperSecretPage);
