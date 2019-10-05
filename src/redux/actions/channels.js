import { SET_CHANNELS, SET_ERRORS, CREATE_CHANNEL } from "./actionTypes";
import axios from "axios";

export const getChannels = () => {
  return async dispatch => {
    try {
      const res = await axios.get("https://api-chatr.herokuapp.com/channels/");
      const channels = res.data;

      dispatch({
        type: SET_CHANNELS,
        payload: channels
      });
    } catch (err) {
      console.error(err);
      getChannels();
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

      dispatch({
        type: CREATE_CHANNEL,
        payload: newChannel
      });
    } catch (err) {
      console.error(err);
    }
  };
};
