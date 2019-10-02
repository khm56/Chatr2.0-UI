import {
  FETCH_CHANNELS,
  ADD_CHANNEL,
  FILTER_CHANNELS
} from "../actions/actionTypes";

const initialState = {
  channels: [],
  filteredChannels: [],
  loading: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CHANNELS:
      return {
        ...state,
        channels: action.payload,
        filteredChannels: action.payload,
        loading: false
      };
    case FILTER_CHANNELS:
      return {
        ...state,
        filteredChannels: state.channels.filter(channel => {
          return `${channel.name}`
            .toLowerCase()
            .includes(action.payload.toLowerCase());
        })
      };
    case ADD_CHANNEL:
      const newChannel = action.payload;
      return {
        ...state,
        channels: [newChannel, ...state.channels]
      };
    default:
      return state;
  }
};
