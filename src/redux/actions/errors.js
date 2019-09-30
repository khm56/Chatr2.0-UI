
import * as actionTypes from "./actionTypes";

export const resetErrors = () => {
  return {
    type: actionTypes.SET_ERRORS,
    payload: []
  };
};