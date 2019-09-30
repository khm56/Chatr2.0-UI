import { ADD_CHANNEL } from "../actions/actionTypes";

const initialState = {
  channels: []
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_CHANNEL:
      //const cannel = payload;
      return {
        ...state,
        channels: [payload].concat(state.channels)
      };
    default:
      return state;
  }
};

export default reducer;
