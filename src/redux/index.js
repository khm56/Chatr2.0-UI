import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers";
import { checkForExpiredToken, getChannels } from "./actions";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

//After defining the store use the following code to call checkForExpiredToken
store.dispatch(checkForExpiredToken());

//Review
//Fetching channels here would sometimes show you that you're unauthorized because the headers wont be set yet
store.dispatch(getChannels());
export default store;
