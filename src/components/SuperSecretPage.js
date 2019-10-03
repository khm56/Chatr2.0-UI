import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "../assets/css/Welcome.css";
import "../assets/css/login.css";
const SuperSecretPage = ({ user }) => {
  if (!user) return <Redirect to="/welcome" />;
  return (
    <div
      className="secret"
      style={{
        backgroundImage: `url(
          "https://media1.giphy.com/media/35MAdPmdmRO3oCmWN0/giphy.gif?cid=790b7611f5d221acd0669649bead56f1fef2215a564da05b&rid=giphy.gif")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        width: "800px",
        minHeight: "700px"
      }}
    >
      <h1 style={{ marginLeft: "210px" }}>this page has all the secrets</h1>
      <p style={{ marginLeft: "260px" }}>
        now that you're logged in you can see this page
      </p>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(SuperSecretPage);
