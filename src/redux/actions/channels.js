import { FETCH_CHANNELS, ADD_CHANNEL } from "./actionTypes";

import axios from "axios";

export const fetchChannels = () => {
  return async dispatch => {
    try {
      const response = await axios.get(
        "https://api-chatr.herokuapp.com/channels/"
      );
      const channels = response.data;
      dispatch({
        type: FETCH_CHANNELS,
        payload: channels
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const addChannel = channel => {
  return async dispatch => {
    try {
      const res = await axios.post(
        "https://api-chatr.herokuapp.com/channels/create/",
        channel
      );
      const newChannel = res.data;
      dispatch({
        type: ADD_CHANNEL,
        payload: newChannel
      });
    } catch (error) {
      console.error(error.response.data);
    }
  };
};
