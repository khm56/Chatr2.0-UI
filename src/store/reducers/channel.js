import * as actionTypes from "../actions/actionTypes";

const initialState = {
  channel: {},
  messages: [],
  loading: true
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CHANNEL_DETAIL:
      return {
        ...state,
        channel: action.payload,
        loading: false
      };

    case actionTypes.POST_MESSAGE:
      return {
        ...state,

        messages: state.messages.concat(action.payload)
      };
    case actionTypes.FETCH_CHANNEL_MESSAGES:
      return {
        ...state,
        messages: state.messages.filter(
          message => message.timestamp > action.payload
        )
      };

    case actionTypes.SET_CHANNEL_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};

export default reducer;
