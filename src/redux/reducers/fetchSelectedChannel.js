// import * as actionTypes from "../actions/actionTypes";
import {
  FETCH_SELECTED_CHANNELS,
  POST_ON_CHANNEL
} from "../actions/actionTypes";

const initialState = {
  messages: [],
  loading: true
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_SELECTED_CHANNELS:
      const selectedChannel = payload;
      return {
        ...state,
        messages: selectedChannel,
        loading: false
      };
    case POST_ON_CHANNEL:
      const createChannel = payload;
      return {
        ...state,
        messages: [createChannel, ...state.messages]
      };
    default:
      return state;
  }
};
export default reducer;
