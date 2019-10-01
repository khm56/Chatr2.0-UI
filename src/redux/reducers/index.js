import { combineReducers } from "redux";

// Reducers
import channelsReducer from "./channels";
import authReducer from "./authentication";
import msgReducer from "./channelMessages";
import errorReducer from "./errors";

export default combineReducers({
  rootChannels: channelsReducer,
  rootMessages: msgReducer,
  user: authReducer,
  errors: errorReducer
});
