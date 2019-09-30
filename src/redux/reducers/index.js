import { combineReducers } from "redux";

// Reducers
import ChannelReducer from "./authentication";
import errorReducer from "./errors";
import channelReducer from "./channels";
const rootReducer = combineReducers({
  user: ChannelReducer,
  errors: errorReducer,
  rootChannel: channelReducer
});
export default rootReducer;
