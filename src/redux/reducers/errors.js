import { SET_ERRORS } from "../actions/actionTypes";

const initialState = {
  errors: []
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ERRORS:
      return {
        ...state,
        errors: payload
          ? Object.keys(payload).map(key => `${key}: ${payload[key]}`)
          : []
      };

    default:
      return state;
  }
};

export default reducer;
