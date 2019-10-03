import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
// import myloading from "./myloading.gif"
import myloading from "./lg.ajax-spinner-gif.gif"

class Loading extends Component {
    render() {
        return (
            <div id="loading" className="container m-4 p-5">
                <div className="spinner mx-auto text-center ">
                    {/* <img src={myloading}></img> */}
                    {/* <FontAwesomeIcon icon={faSpinner} spin size="4x" /> */}
                    <div style={{ height: "500px", width: "950px", position: "relative", bottom: "150px", left: "200px", padding: "200px" }} id="bgIMG">
                        <img style={{ position: "relative", bottom: "30px", width: "150px", height: "150px" }} src={myloading}></img>
                    </div>
                </div>
            </div>
        );
    }
}

export default Loading;