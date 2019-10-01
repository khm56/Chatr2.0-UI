import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Loading = () => (
  <div className="spinner mx-auto text-center mt-5">
    <FontAwesomeIcon icon={faSpinner} spin size="4x" />
  </div>
);

export default Loading;
