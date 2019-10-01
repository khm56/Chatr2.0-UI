// import * as actionTypes from "../actions/actionTypes";
import {
  FETCH_CHANNELS,
  FETCH_SELECTED_CHANNELS,
  POST_CHANNEL
} from "../actions/actionTypes";

const initialState = {
  channels: [],
  loading: true
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_CHANNELS:
      const newChannel = payload;
      return {
        ...state,
        channels: newChannel,
        loading: false
      };
    // case FETCH_SELECTED_CHANNELS:
    //   const selectedChannel = payload;
    //   return {
    //     ...state,
    //     channels: selectedChannel,
    //     loading: false
    //   };
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
