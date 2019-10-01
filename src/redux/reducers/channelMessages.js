import { FETCH_CHANNEL_MSG, POST_MESSAGE } from "../actions/actionTypes";

const initialState = {
  messages: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CHANNEL_MSG:
      const messages = action.payload;
      return {
        ...state,
        messages
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
