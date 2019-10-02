import { FETCH_SELECTED_CHANNELS, POST_ON_CHANNEL } from "./actionTypes";
import axios from "axios";
import { setErrors } from "./errors";

export const fetchSelectedChannel = channelID => {
  return async dispatch => {
    try {
      const response = await axios.get(
        `https://api-chatr.herokuapp.com/channels/${channelID}/`
      );
      const currentChannel = response.data;
      dispatch({ type: FETCH_SELECTED_CHANNELS, payload: currentChannel });
    } catch (error) {
      console.error(error);
      dispatch(setErrors(error));
    }
  };
};

export const postOnChannel = (message, channelID, history) => {
  return async dispatch => {
    try {
      const res = await axios.post(
        `https://api-chatr.herokuapp.com/channels/${channelID}/send/`,
        message
      );
      const currentchannel = res.data;
      dispatch({
        type: POST_ON_CHANNEL,
        payload: currentchannel
      });
      history.replace("/private");
    } catch (error) {
      console.error(error);
      dispatch(setErrors(error));
    }
  };
};
