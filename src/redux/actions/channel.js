import {
  SET_CHANNELS,
  SET_MESSAGES,
  SET_MESSAGE,
  SET_NEW_MESSAGES
} from "./actionTypes";
import axios from "axios";
export const getMessages = channel => {
  return async dispatch => {
    try {
      const res = await axios.get("https://api-chatr.herokuapp.com/channels/");
      const channels = res.data;
      // dispatch(setCurrentUser(user.token));
      // history.push("/");
      dispatch({
        type: SET_CHANNELS,
        payload: channels
      });
    } catch (err) {
      console.error(err);
      //   dispatch({
      //     type: SET_ERRORS,
      //     payload: err.response.data
      //   });
    }
  };
};
export const fetchMessages = (id, loadingFn, scrollFn) => {
  return async dispatch => {
    try {
      loadingFn(true);
      const res = await axios.get(
        `https://api-chatr.herokuapp.com/channels/${id}/`
      );
      const messages = res.data;

      loadingFn(false);
      // dispatch(setCurrentUser(user.token));
      // history.push("/");
      dispatch({
        type: SET_MESSAGES,
        payload: messages,
        channelID: id
      });
      scrollFn();
    } catch (err) {
      console.error(err);
      loadingFn(false);
      //   dispatch({
      //     type: SET_ERRORS,
      //     payload: err.response.data
      //   });
    }
  };
};
export const fetchMessagesTS = (id, timestamp) => {
  return async dispatch => {
    try {
      const res = await axios.get(
        `https://api-chatr.herokuapp.com/channels/${id}/?latest=${timestamp}`
      );

      const messages = res.data;
      console.log("nigger", messages);
      // dispatch(setCurrentUser(user.token));
      // history.push("/");
      dispatch({
        type: SET_MESSAGE,
        payload: messages,
        channelID: id
      });
    } catch (err) {
      if (err.response.status == 500) {
        console.log("No new messages");
      } else {
        console.error(err.response);
      }

      //   dispatch({
      //     type: SET_ERRORS,
      //     payload: err.response.data
      //   });
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
      message.username = username;

      // dispatch(setCurrentUser(user.token));
      // history.push("/");
      dispatch({
        type: SET_MESSAGE,
        payload: message,
        channelID: id
      });
    } catch (err) {
      console.error(err);
      //   dispatch({
      //     type: SET_ERRORS,
      //     payload: err.response.data
      //   });
    }
  };
};
