import { ADD_CHANNEL } from "./actionTypes";
import axios from "axios";
// import jwt_decode from "jwt-decode";

const instance = axios.create({
  baseURL: "https://api-chatr.herokuapp.com/"
});

export const addChannel = (channel, history) => {
  return async dispatch => {
    try {
      const res = await axios.post(
        "https://api-chatr.herokuapp.com/channels/create/",
        channel
      );
      const object = res.data;
      dispatch({
        type: ADD_CHANNEL,
        payload: object
      });
      history.push("/");
    } catch (err) {
      console.error(err);
      //console.error(err.response.data);
    }
  };
};
