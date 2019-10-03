import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "../assets/css/Welcome.css";
const SuperSecretPage = ({ user }) => {
  if (!user) return <Redirect to="/welcome" />;
  return (
    <div className="secret">
      <h1>this page has all the secrets</h1>
      <p>now that you're logged in you can see this page</p>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(SuperSecretPage);
