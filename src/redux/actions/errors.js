import { SET_ERRORS } from "./actionTypes";

export const setErrors = errors => ({ type: SET_ERRORS, payload: errors });
export const resetErrors = () => {
  return {
    type: SET_ERRORS,
    payload: []
  };
};
