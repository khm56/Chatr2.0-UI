import * as actionTypes from "../actions/actionTypes";

const initialState = {
  channels: [],
  channel: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CHANNELS:
      return {
        ...state,
        channels: action.payload
      };
    case actionTypes.GET_CHANNEL:
      return {
        ...state,
        channel: action.payload
      };

    default:
      return state;
  }
};

export default reducer;
