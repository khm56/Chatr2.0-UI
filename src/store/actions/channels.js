import * as actionTypes from "./actionTypes";

import axios from "axios";

const instance = axios.create({
  baseURL: "https://api-chatr.herokuapp.com/"
});

export const fetchChannels = () => {
  return dispatch => {
    instance
      .get("/channels/")
      .then(res => res.data)
      .then(channels =>
        dispatch({ type: actionTypes.FETCH_CHANNELS, payload: channels })
      )
      .catch(error => console.error(error));
  };
};

const setLoading = () => ({
  type: actionTypes.SET_CHANNEL_LOADING
});

export const fetchMessages = channelID => {
  return dispatch => {
    dispatch(setLoading());
    instance
      .get(`/channels/${channelID}/`)
      .then(res => res.data)
      .then(messages =>
        dispatch({
          type: actionTypes.FETCH_MESSAGES,
          payload: messages
        })
      )
      .catch(err => console.error(err));
  };
};

export const postChannel = newChannel => {
  console.log(newChannel);
  return dispatch => {
    instance
      .post("/channels/create/", newChannel)
      .then(res => res.data)
      .then(createdChannel =>
        dispatch({
          type: actionTypes.POST_CHANNEL,
          payload: createdChannel
        })
      )
      .catch(error => console.error(error.response.data));
  };
};
