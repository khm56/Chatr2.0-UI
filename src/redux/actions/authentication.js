import axios from "axios";
import jwt_decode from "jwt-decode";

import { SET_CURRENT_USER } from "./actionTypes";

import { setErrors } from "./errors";

//Delete any thing u are not using
const instance = axios.create({
  baseURL: "https://api-chatr.herokuapp.com/"
});

const setCurrentUser = token => {
  let user;
  if (token) {
    localStorage.setItem("token", token);
    axios.defaults.headers.common.Authorization = `jwt ${token}`;
    user = jwt_decode(token);
    //Fetching channels should happen here
  } else {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common.Authorization;
    user = null;
  }

  return {
    type: SET_CURRENT_USER,
    payload: user
  };
};

export const checkForExpiredToken = () => {
  const token = localStorage.getItem("token");
  let user = null;
  if (token) {
    const currentTimeInSeconds = Date.now() / 1000;
    user = jwt_decode(token);
    if (user.exp >= currentTimeInSeconds) {
      return setCurrentUser(token);
    }
  }
  return logout();
};

export const auth = (userData, type, history) => {
  return async dispatch => {
    try {
      let response = await axios.post(
        `https://api-chatr.herokuapp.com/${type}/`,
        userData
      );
      let user = response.data;
      dispatch(setCurrentUser(user.token));
      history.replace("/private");
      dispatch(setErrors(""));
    } catch (error) {
      console.error(error);
      dispatch(
        setErrors("Invalid input, please check the username and password!!")
      );
    }
  };
};

export const logout = () => {
  return setCurrentUser();
};
