import { FETCH_CHANNELS } from "./actionTypes";
import axios from "axios";
import { setErrors } from "./errors";
export const fetchChannels = () => {
  return async dispatch => {
    console.log("hello");
    try {
      const res = await axios.get("https://api-chatr.herokuapp.com/channels/");
      const channels = res.data;
      console.log(channels);
      dispatch({ type: FETCH_CHANNELS, payload: channels });
    } catch (err) {
      console.error(err);
      dispatch(setErrors(err));
    }
  };
};
