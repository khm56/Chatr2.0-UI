import { FETCH_CHANNELS, ADD_CHANNEL, FILTER_CHANNELS } from "./actionTypes";
import { setErrors } from "./errors";

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

export const filterChannels = query => {
  return {
    type: FILTER_CHANNELS,
    payload: query
  };
};

export const addChannel = (channel, history) => {
  return async dispatch => {
    try {
      const res = await axios.post(
        "https://api-chatr.herokuapp.com/channels/create/",
        channel
      );
      const newChannel = res.data;
      dispatch(setErrors(""));
      dispatch({
        type: ADD_CHANNEL,
        payload: newChannel
      });
      history.replace(`/channels/${newChannel.id}`);
    } catch (error) {
      console.error(error.response.data);
      dispatch(setErrors("Invalid input!!"));
    }
  };
};
