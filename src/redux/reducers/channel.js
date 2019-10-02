import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: true
};

const reducer = (state = initialState, action) => {
  const channel = action.channelID;
  switch (action.type) {
    case actionTypes.UPDATE_DRAFT:
      return {
        ...state,
        [`messages${channel}`]: state[`messages${channel}`].concat(
          action.messageContent
        ),
        [`users${channel}`]: state[`users${channel}`].concat(
          action.messageUsers
        ),
        [`time${channel}`]: state[`time${channel}`].concat(action.messageTime)
      };
    case actionTypes.MAKE_DRAFT:
      return {
        ...state,
        [`messages${channel}`]: action.messageContent,
        [`time${channel}`]: action.messageTime,
        [`users${channel}`]: action.messageUsers
      };
    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
