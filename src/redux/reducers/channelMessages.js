import {
  FETCH_CHANNEL_MSG,
  POST_MESSAGE,
  SET_MSG_LOADING
} from "../actions/actionTypes";

const initialState = {
  messages: [],
  loading: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CHANNEL_MSG:
      const messages = action.payload;
      return {
        ...state,
        messages,
        loading: false
      };
    case SET_MSG_LOADING:
      return {
        ...state,
        loading: true
      };
    case POST_MESSAGE:
      const newMessage = action.payload;
      return {
        ...state,
        messages: [...newMessage, ...state.messages]
      };
    default:
      return state;
  }
};
