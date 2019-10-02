import * as actionTypes from "./actionTypes";

import axios from "axios";

export const fetchChannels = () => {
  return async dispatch => {
    try {
      const res = await axios.get("https://api-chatr.herokuapp.com/channels/");
      const channels = res.data;
      dispatch({
        type: actionTypes.FETCH_CHANNELS,
        payload: channels
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const getChannel = (channelID, timeStamp) => {
  // console.log(channelID);
  return async dispatch => {
    try {
      const res = await axios.get(
        `https://api-chatr.herokuapp.com/channels/${channelID}/?latest=${timeStamp}`
      );
      const channelObj = {
        id: channelID,
        messages: res.data
      };

      dispatch({
        type: actionTypes.GET_CHANNEL,
        payload: channelObj
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const createChannel = channel_name => {
  return async dispatch => {
    try {
      const res = await axios.post(
        "https://api-chatr.herokuapp.com/channels/create/",
        channel_name
      );
      const newChannel = res.data;
      dispatch({
        type: actionTypes.CREATE_CHANNEL,
        payload: newChannel
      });
    } catch (error) {
      console.error(error.response.data);
    }
  };
};

export const postMsg = (channelID, msg, user) => {
  return async dispatch => {
    try {
      const res = await axios.post(
        `https://api-chatr.herokuapp.com/channels/${channelID}/send/`,
        msg
      );
      const newMsg = res.data;
      newMsg.username = user;
      dispatch({
        type: actionTypes.POST_MSG,
        payload: newMsg
      });
    } catch (error) {
      console.error(error);
      console.error(error.response.data);
    }
  };
};
