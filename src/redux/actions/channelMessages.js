import { FETCH_CHANNEL_MSG, POST_MESSAGE } from "./actionTypes";

import axios from "axios";

export const fetchChannelMsg = channelID => {
  return async dispatch => {
    try {
      const res = await axios.get(
        `https://api-chatr.herokuapp.com/channels/${channelID}/`
      );
      let messages = res.data;
      dispatch({
        type: FETCH_CHANNEL_MSG,
        payload: messages
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const postMessage = (message, channelID) => {
  return async dispatch => {
    try {
      const res = await axios.post(
        `https://api-chatr.herokuapp.com/channels/${channelID}/send/`,
        message
      );
      const newMessage = res.data;
      dispatch({
        type: POST_MESSAGE,
        payload: newMessage
      });
    } catch (error) {
      console.error(error);
    }
  };
};
