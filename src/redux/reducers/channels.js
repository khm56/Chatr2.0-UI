import { FETCH_CHANNELS, ADD_CHANNEL } from "../actions/actionTypes";

const initialState = {
  channels: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CHANNELS:
      const channels = action.payload;
      return {
        ...state,
        channels
      };
    case ADD_CHANNEL:
      const newChannel = action.payload;
      return {
        ...state,
        channels: [newChannel, ...state.channels]
      };
    default:
      return state;
  }
};
