import { SET_CHANNELS, SET_MESSAGES, SET_MESSAGE } from "./actionTypes";
import axios from "axios";
export const getMessages = channel => {
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
    }
  };
};
export const fetchMessages = (id, loadingFn, scrollFn) => {
  return async dispatch => {
    try {
      if (loadingFn) loadingFn(true);
      const res = await axios.get(
        `https://api-chatr.herokuapp.com/channels/${id}/`
      );
      const messages = res.data;

      if (loadingFn) loadingFn(false);

      dispatch({
        type: SET_MESSAGES,
        payload: messages,
        channelID: id
      });
      scrollFn();
    } catch (err) {
      console.error(err);
      if (loadingFn) loadingFn(false);
    }
  };
};
export const fetchMessagesTS = (id, timestamp) => {
  if (!timestamp) return { type: "" };
  return async dispatch => {
    try {
      const res = await axios.get(
        `https://api-chatr.herokuapp.com/channels/${id}/?latest=${timestamp}`
      );

      const messages = res.data;

      dispatch({
        type: SET_MESSAGE,
        payload: messages,
        channelID: id
      });
    } catch (err) {
      console.error(err.response);
    }
  };
};
export const sendMessage = (id, msg, username) => {
  const masg = {
    message: msg
  };

  return async dispatch => {
    try {
      const res = await axios.post(
        `https://api-chatr.herokuapp.com/channels/${id}/send/`,
        masg
      );
      let message = res.data;

      dispatch({ type: "" });
    } catch (err) {
      console.error(err);
    }
  };
};
