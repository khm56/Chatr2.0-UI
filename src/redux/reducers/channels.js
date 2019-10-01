import * as actionTypes from "../actions/actionTypes";

const initialState = {
  channels: [],
  channel: null
  // msgs: []
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
    case actionTypes.CREATE_CHANNEL:
      console.log(action.payload);
      return {
        ...state,
        channels: state.channels.concat(action.payload)
      };
    case actionTypes.POST_MSG:
      return {
        ...state,
        channel: state.channel.concat(action.payload)
      };

    default:
      return state;
  }
};

export default reducer;
