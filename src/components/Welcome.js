import React from "react";
import { Link } from "react-router-dom";
// import { Redirect } from "react-router-dom";
import logox from "../assets/image/logox.png";

const Welcome = () => {
  return (
    <header className="masthead d-flex col-12">
      <div
        className="text-center my-auto col-12"
        style={{
          backgroundImage: `url(${logox})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: " 50%",
          // backgroundAttachment: "fixed",
          backgroundPosition: "center",
          minHeight: "600px"
        }}
      >
        <br></br>
        {/* <div
          style={{
            backgroundImage: `url(${logox})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: " cover",
            // backgroundAttachment: "fixed",
            backgroundPosition: "center",
            minHeight: "600px"
          }}
        ></div> */}
        <h1 className="mb-1 text-white">Welcome</h1>
        <h3 className="mb-5 text-white">
          <em>Login to start..</em>
        </h3>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <Link
          to="/login"
          className="btn btn-light btn-lg"
          style={{ marginRight: "30px" }}
        >
          Login
        </Link>
      </div>
      <div className="overlay z-0" />
    </header>
  );
};
export default Welcome;
