import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers";
import { checkForExpiredToken, fetchChannels } from "../redux/actions";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
store.dispatch(checkForExpiredToken());
// Fetch Channels should happen after setting the headers in the axios request to avoid getting a 401 error (unauthorized)
store.dispatch(fetchChannels());

export default store;
