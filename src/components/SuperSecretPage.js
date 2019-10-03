import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const SuperSecretPage = ({ user }) => {
  if (!user) return <Redirect to="/login" />;

  return (
    <>
      <div classname="my-5">
        <img src="https://thumbs.gfycat.com/GlamorousSimilarAnt-max-1mb.gif" />
        <img src="https://thumbs.gfycat.com/GlamorousSimilarAnt-max-1mb.gif" />
        <img src="https://thumbs.gfycat.com/GlamorousSimilarAnt-max-1mb.gif" />
        <img src="https://thumbs.gfycat.com/GlamorousSimilarAnt-max-1mb.gif" />
      </div>
      <div style={{ position: "relative", bottom: 400 }}>
        <img src="https://en.bloggif.com/tmp/8b7b30ec6cbe93a3b9898a6ecdababfc/text.gif?1570066930" />
        <img src="https://en.bloggif.com/tmp/cf702e1115ebbacd537ed1ec6506b4f5/text.gif?1570067185" />
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(SuperSecretPage);
