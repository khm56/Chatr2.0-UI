import * as actionTypes from "./actionTypes";

import axios from "axios";

const instance = axios.create({
  baseURL: "https://api-chatr.herokuapp.com/"
});

const setLoading = () => ({
  type: actionTypes.SET_CHANNEL_LOADING
});

export const fetchChannelDetail = channelID => {
  return dispatch => {
    dispatch(setLoading());
    instance
      .get(`/channels/${channelID}/`)
      .then(res => res.data)
      .then(channel =>
        dispatch({
          type: actionTypes.FETCH_CHANNEL_DETAIL,
          payload: channel
        })
      )
      .catch(err => console.error(err));
  };
};

export const fetchChannelMessages = (channelID, timestamp) => {
  return dispatch => {
    dispatch(setLoading());
    instance
      .get(`/channels/${channelID}/${timestamp}`)
      .then(res => res.data)
      .then(messages =>
        dispatch({
          type: actionTypes.FETCH_CHANNEL_MESSAGES,
          payload: messages
        })
      )
      .catch(err => console.error(err));
  };
};

export const postMessage = (message, channelID) => {
  message = {
    ...message,
    channels: [channelID]
  };
  console.log(message);
  return dispatch => {
    instance
      .post(`/channels/${channelID}/send/`, message)
      .then(res => res.data)
      .then(createdmessage =>
        dispatch({
          type: actionTypes.POST_MESSAGE,
          payload: createdmessage
        })
      )
      .catch(error => console.error(error));
  };
};
