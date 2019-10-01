import { SET_CHANNELS, SET_ERRORS, CREATE_CHANNEL } from "./actionTypes";
import axios from "axios";
export const getChannels = () => {
  return async dispatch => {
    try {
      const res = await axios.get("https://api-chatr.herokuapp.com/channels/");
      const channels = res.data;
      // dispatch(setCurrentUser(user.token));
      // history.push("/");
      dispatch({
        type: SET_CHANNELS,
        payload: channels
      });
    } catch (err) {
      console.error(err);
      //   dispatch({
      //     type: SET_ERRORS,
      //     payload: err.response.data
      //   });
    }
  };
};

export const createChannel = name => {
  return async dispatch => {
    try {
      const res = await axios.post(
        "https://api-chatr.herokuapp.com/channels/create/",
        { name: name }
      );
      const newChannel = res.data;
      // dispatch(setCurrentUser(user.token));
      // history.push("/");
      console.log(newChannel);
      dispatch({
        type: CREATE_CHANNEL,
        payload: newChannel
      });
    } catch (err) {
      console.error(err);
      //   dispatch({
      //     type: SET_ERRORS,
      //     payload: err.response.data
      //   });
    }
  };
};
