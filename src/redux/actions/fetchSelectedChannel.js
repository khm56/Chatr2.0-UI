import { FETCH_SELECTED_CHANNELS } from "./actionTypes";
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
