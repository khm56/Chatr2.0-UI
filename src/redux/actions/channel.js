import * as actionTypes from "./actionTypes";

import axios from "axios";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com"
});

// const setLoading = () => ({
//   type: actionTypes.SET_CHANNEL_LOADING
// });


export const fetchMessages = (channelID) => {
    return async dispatch => {
      try {
        const res = await axios.get(
          `https://api-chatr.herokuapp.com/channels/${channelID}`
        );
        const messages = res.data;
        dispatch({
          type: actionTypes.FETCH_CHANNEL_MESSAGES,
          payload: messages
        });
      } catch (error) {
        console.error(error);
      }
    };
  };



export const postMessage = (message, channelID, user) => {
  message = {
    ...message,
    channel: channelID,
    user: user
  };
  return async dispatch => {
    try {
      const res = await axios.post(`channels/${channelID}/send/`, message);
      const newMessage = res.data;
      dispatch({
        type: actionTypes.SEND_CHANNEL_MESSAGE,
        payload: newMessage
      });
    } catch (error) {
      console.error(error.response.data);
    }
  };
};