import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { checkForExpiredToken } from "./store/actions/authentication";
import { fetchChannels } from "./store/actions/channels";

// Components
import App from "./App";

//Reducers
import authReducer from "./store/reducers/authentication";
import channelReducer from "./store/reducers/channel";
import channelsReducer from "./store/reducers/channels";

const rootReducer = combineReducers({
  rootAuth: authReducer,
  rootChan: channelReducer,
  rootChans: channelsReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

store.dispatch(checkForExpiredToken());
store.dispatch(fetchChannels());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
