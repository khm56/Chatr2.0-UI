import React from "react";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import giphya from "../giphya.gif";
import { faAlignCenter } from "@fortawesome/free-solid-svg-icons";
// import { url } from "inspector";

const Welcome = ({ user }) => {
  return (
    <div
      className="p-4"
      // className="masthead d-flex"
      style={
        {
          // backgroundImage: `url(${giphya})`,
          // backgroundPosition: "center",
          // backgroundSize: "cover",
          // backgroundRepeat: "no-repeat",
          // backgroundAttachment: "fixed",
          // height: "50vh"
          // paddingBottom: 400
          // height: "550px"
        }
      }
    >
      <div>
        <h1
          className="mb-1 text-center change_font2"
          // style={{
          //   fontFamily: "Acme"
          //   // letterSpacing: 3
          // }}
        >
          Welcome To CODED Chatr
        </h1>
      </div>
      <img
        src="https://media.giphy.com/media/5WILqPq29TyIkVCSej/giphy.gif"
        style={{
          display: "inline",
          paddingLeft: "20%",
          width: "75%"
          //height: "400px"
          //paddingBottom: "5px"
        }}
      ></img>
    </div>
  );
};
const mapStateToProps = state => ({
  user: state.user
});
export default connect(mapStateToProps)(Welcome);
