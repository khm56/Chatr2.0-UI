import * as actionTypes from "./actionTypes";

import axios from "axios";

// const setLoading = () => ({
//   type: actionTypes.SET_CHANNEL_LOADING
// });

export const updateDraft = (channelID, timestamp) => {
  return async dispatch => {
    try {
      const res = await axios.get(
        `https://api-chatr.herokuapp.com/channels/${channelID}/?latest=${timestamp}`
      );
      const messages = res.data;
      const messagesOnly = messages.map(message => message.message);
      const messagesUsers = messages.map(message => message.username);
      const messagesTime = messages.map(message => message.timestamp);

      dispatch({
        type: actionTypes.UPDATE_DRAFT,
        messageContent: messagesOnly,
        messageUsers: messagesUsers,
        messageTime: messagesTime,
        channelID: channelID
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const makeDraft = channelID => {
  return async dispatch => {
    try {
      const res = await axios.get(
        `https://api-chatr.herokuapp.com/channels/${channelID}`
      );
      const messages = res.data;
      const messagesOnly = messages.map(message => message.message);
      const messagesUsers = messages.map(message => message.username);
      const messagesTime = messages.map(message => message.timestamp);

      dispatch({
        type: actionTypes.MAKE_DRAFT,
        messageContent: messagesOnly,
        messageUsers: messagesUsers,
        messageTime: messagesTime,
        channelID: channelID
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const postMessage = (messageContent, channelID) => {
  return async dispatch => {
    try {
      const res = await axios.post(
        `https://api-chatr.herokuapp.com/channels/${channelID}/send/`,
        { message: messageContent }
      );
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

export const setLoading = loading => {
  return {
    type: actionTypes.SET_LOADING,
    payload: loading
  };
};
