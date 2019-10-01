import * as actionTypes from "../actions/actionTypes";

const initialState = {
  messages: [],
  users:[],
  filteredMessages: [],
  loading: true
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.FETCH_CHANNEL_MESSAGES:
  
        return {
          ...state,
          messages: action.messageContent,
          users: action.messageUsers,
          time: action.messageTime,
          filteredMessages: action.payload,
          loading: false
        };
        default:
            return state;
        }
      };

export default reducer;