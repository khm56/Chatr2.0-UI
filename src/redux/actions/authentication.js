import axios from "axios";
import jwt_decode from "jwt-decode";

import { SET_CURRENT_USER, SET_ERRORS, SET_CHANNELS } from "./actionTypes";
import { getChannels } from "./channels";
import { setErrors } from "./errors";

//Clean code practitces dont import or define something you wont use

const instance = axios.create({
  baseURL: "https://api-chatr.herokuapp.com/"
});

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

export const login = (userData, history) => {
  return async dispatch => {
    try {
      const res = await axios.post(
        "https://api-chatr.herokuapp.com/login/",
        userData
      );
      const user = res.data;
      dispatch(setCurrentUser(user.token));
      dispatch(getChannels());
      history.push("/channel/");
    } catch (err) {
      // console.error(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response ? err.response.data : null
      });
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
      //If your backend logs the user in when signing up use the following code
      const user = res.data;

      dispatch(setCurrentUser(user.token));
      //If it doesn't log you in
      dispatch(login(userData));
      history.push("/channel/");
    } catch (err) {
      // console.error(err.response.data);
      dispatch({
        type: SET_ERRORS,
        payload: err.response ? err.response.data : null
      });
    }
  };
};

export const logout = () => setCurrentUser();

const setCurrentUser = token => {
  let user;
  if (token) {
    localStorage.setItem("token", token);
    axios.defaults.headers.common.Authorization = `jwt ${token}`;
    user = jwt_decode(token);

    // my suggestion would be fetching channels should be called here so you'd be sure that axios headers are set
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
