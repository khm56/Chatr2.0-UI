import axios from "axios";
import * as actionTypes from "./actionTypes";

export const fetchChannels = () => {
  return async dispatch => {
    try {
      const res = await axios.get(
        "https://api-chatr.herokuapp.com/channels/"
      );
      const channels = res.data;
      dispatch({
        type: actionTypes.FETCH_CHANNELS,
        payload: channels
      });
    } catch (error) {
      console.error(error);
    }
  };
};


export const filterChannels = query => {
  return {
    type: actionTypes.FILTER_CHANNELS,
    payload: query
  };
};


export const addChannel= channel => {
  return async dispatch => {
    try {
      const res = await axios.post(
        "https://api-chatr.herokuapp.com/channels/create",
        channel
      );
      const newChannel = res.data;
      dispatch({
        type: actionTypes.ADD_CHANNEL,
        payload: newChannel
      });
    } catch (error) {
      console.error(error.response.data);
    }
  };
};