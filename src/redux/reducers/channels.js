// import * as actionTypes from "../actions/actionTypes";
import { FETCH_CHANNELS } from "../actions/actionTypes";

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
    default:
      return state;
  }
};
export default reducer;
