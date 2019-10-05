import {
  FETCH_CHANNELS,
  POST_CHANNEL,
  FILTER_CHANNELS,
  SET_LOADING
} from "./actionTypes";
import axios from "axios";
import { setErrors } from "./errors";

export const fetchChannels = () => {
  return async dispatch => {
    // console.log(“hello”);
    try {
      const res = await axios.get("https://api-chatr.herokuapp.com/channels/");
      const channels = res.data;
      // console.log(channels);
      dispatch({ type: FETCH_CHANNELS, payload: channels });
      setTimeout(() => dispatch({ type: SET_LOADING }), 5000);
    } catch (err) {
      console.error(err);
      dispatch(setErrors(err));
    }
  };
};
export const postChannel = (channel, history) => {
  return async dispatch => {
    try {
      const res = await axios.post(
        "https://api-chatr.herokuapp.com/channels/create/",
        channel
      );
      const createdchannel = res.data;
      dispatch({
        type: POST_CHANNEL,
        payload: createdchannel
      });
      history.replace(`/fetchSelectedChannel/${createdchannel.id}`);
    } catch (error) {
      console.error(error);
      dispatch(setErrors(error));
    }
  };
};
export const filterChannels = query => {
  return {
    type: FILTER_CHANNELS,
    payload: query
  };
};
