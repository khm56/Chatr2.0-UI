import * as actionTypes from "../actions/actionTypes";

const initialState = {
  messages: [],
  filteredMessages: [],
  loading: true
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.FETCH_CHANNEL_MESSAGES:
        return {
          ...state,
          messages: action.payload,
          filteredMessages: action.payload,
          loading: false
        };
        default:
            return state;
        }
      };

export default reducer;