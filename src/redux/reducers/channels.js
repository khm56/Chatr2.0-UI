// import * as actionTypes from "../actions/actionTypes";
import {
  FETCH_CHANNELS,
  POST_CHANNEL,
  FILTER_CHANNELS
} from "../actions/actionTypes";

const initialState = {
  channels: [],
  loading: true,
  filteredChannels: []
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_CHANNELS:
      //You dont need to store it in a variable
      const newChannel = payload;
      return {
        ...state,
        channels: newChannel,
        filteredChannels: newChannel,
        loading: false
      };
    case FILTER_CHANNELS:
      return {
        ...state,
        filteredChannels: state.channels.filter(channel => {
          return `${channel.name}`.toLowerCase().includes(payload);
        })
      };
    case POST_CHANNEL:
      const createChannel = payload;
      return {
        ...state,
        channels: [createChannel, ...state.channels]
      };

    default:
      return state;
  }
};
export default reducer;
