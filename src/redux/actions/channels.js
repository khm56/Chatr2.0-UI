import { FETCH_CHANNELS, POST_CHANNEL } from "./actionTypes";
import axios from "axios";
import { setErrors } from "./errors";

export const fetchChannels = () => {
  return async dispatch => {
    // console.log("hello");
    try {
      const res = await axios.get("https://api-chatr.herokuapp.com/channels/");
      const channels = res.data;
      // console.log(channels);
      dispatch({ type: FETCH_CHANNELS, payload: channels });
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
      history.replace("/private");
    } catch (error) {
      console.error(error);
      dispatch(setErrors(error));
    }
  };
};
