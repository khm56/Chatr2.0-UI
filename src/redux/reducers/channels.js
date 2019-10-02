import * as actionTypes from "../actions/actionTypes";

const initialState = {
  channels: [],
  filteredChannels: [],
  loading: true
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CHANNELS:
      return {
        ...state,
        channels: action.payload,
        filteredChannels: action.payload,
        loading: false
      };

    case actionTypes.FILTER_CHANNELS:
      return {
        ...state,
        filteredChannels: state.channels.filter(channel => {
          return channel.name.toLowerCase().includes(action.payload);
        })
      };
    case actionTypes.ADD_CHANNEL:
      return {
        ...state,
        channels: [action.payload].concat(state.channels)
      };
    default:
      return state;
  }
};

export default reducer;
