import {
  SET_MESSAGES,
  SET_MESSAGE,
  SET_NEW_MESSAGES
} from "../actions/actionTypes";

const initialState = {
  messages: []
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    // case SET_MESSAGES:
    //   return {
    //     ...state,
    //     messages: [...payload]
    //   };

    // case SET_NEW_MESSAGES:
    //   let newMessages;
    //   if (payload.length > 0) {
    //     newMessages = payload;
    //   }
    //   return {
    //     ...state,
    //     messages: [...state.messages, ...newMessages]
    //   };
    default:
      return state;
  }
};

export default reducer;
