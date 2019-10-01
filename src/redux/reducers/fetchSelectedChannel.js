// import * as actionTypes from "../actions/actionTypes";
import { FETCH_SELECTED_CHANNELS } from "../actions/actionTypes";

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
    default:
      return state;
  }
};
export default reducer;
