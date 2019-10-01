import {
  ADD_CHANNEL,
  FETCH_CHANNEL,
  FETCH_MSGS,
  ADD_MSG
} from "../actions/actionTypes";

const initialState = {
  channels: [],
  msgs: []
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_CHANNEL:
      //const cannel = payload;
      return {
        ...state,
        channels: [payload, ...state.channels]
      };
    case FETCH_CHANNEL:
      return {
        ...state,
        channels: payload
      };
    case FETCH_MSGS:
      return {
        ...state,
        msgs: payload
      };
    case ADD_MSG:
      return {
        ...state,
        msgs: [payload, ...state.msgs]
      };
    default:
      return state;
  }
};

export default reducer;
