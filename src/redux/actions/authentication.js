import axios from "axios";
import jwt_decode from "jwt-decode";

import { SET_CURRENT_USER } from "./actionTypes";
import { fetchChannels } from "./channels";
// import { fetchSelectedChannel } from "./channels";
import { setErrors } from "./errors";

// Please delete any unused code practice of clean code

// const instance = axios.create({
//   baseURL: "https://api-chatr.herokuapp.com/"
// });

export const checkForExpiredToken = () => {
  // Check for token expiration
  const token = localStorage.getItem("token");
  let user = null;
  if (token) {
    const currentTimeInSeconds = Date.now() / 1000;

    // Decode token and get user info
    user = jwt_decode(token);

    // Check token expiration
    if (user.exp >= currentTimeInSeconds) {
      // Set user
      return setCurrentUser(token);
    }
  }
  return logout();
};

const setCurrentUser = token => {
  return async dispatch => {
    try {
      let user;
      if (token) {
        localStorage.setItem("token", token);
        axios.defaults.headers.common.Authorization = `jwt ${token}`;
        user = jwt_decode(token);
        dispatch(fetchChannels());
        // dispatch(fetchSelectedChannel(token));
      } else {
        localStorage.removeItem("token");
        delete axios.defaults.headers.common.Authorization;
        user = null;
      }

      dispatch({
        type: SET_CURRENT_USER,
        payload: user
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const signup = (userData, history) => {
  return async dispatch => {
    try {
      const res = await axios.post(
        "https://api-chatr.herokuapp.com/signup/",
        userData
      );
      const user = res.data;
      dispatch(setCurrentUser(user.token));
      dispatch(setErrors());
      history.replace("/private");
    } catch (error) {
      console.error(error);
      dispatch(setErrors("Input is Invalid"));
    }
  };
};
export const logout = () => setCurrentUser();

export const login = (userData, history) => {
  return async dispatch => {
    try {
      const res = await axios.post(
        "https://api-chatr.herokuapp.com/login/",
        userData
      );
      const user = res.data;
      let token = user.token;
      dispatch(setCurrentUser(token));
      dispatch(setErrors());
      history.replace("/private");
    } catch (error) {
      console.error(error);
      dispatch(setErrors("Input is Invalid"));
    }
  };
};
