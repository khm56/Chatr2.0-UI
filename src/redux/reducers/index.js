import { combineReducers } from "redux";

// Reducers
import ChannelReducer from "./authentication";
import errorReducer from "./errors";
import channelReducer from "./channels";
import messagesReducer from "./fetchSelectedChannel";
const rootReducer = combineReducers({
  user: ChannelReducer,
  errors: errorReducer,
  rootChannel: channelReducer,
  rootMessages: messagesReducer
});
export default rootReducer;
