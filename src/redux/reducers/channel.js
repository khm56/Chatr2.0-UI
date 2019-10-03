import {
  ADD_CHANNEL,
  FETCH_CHANNEL,
  FETCH_CHANNEL_DETAIL,
  FETCH_MSGS,
  ADD_MSG,
  FILTER_CHANNELS
} from "../actions/actionTypes";

const initialState = {
  channel: null,
  channels: [],
  msgs: [],
  filteredChannels: []
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FILTER_CHANNELS:
      return {
        ...state,
        filteredChannels: state.channels.filter(channel => {
          return `${channel.name}`.toLowerCase().includes(payload);
        })
      };
    case ADD_CHANNEL:
      //const cannel = payload;
      return {
        ...state,
        channels: [payload, ...state.channels]
      };
    case FETCH_CHANNEL:
      return {
        ...state,
        channels: payload,
        filteredChannels: payload
      };
    case FETCH_CHANNEL_DETAIL:
      return {
        ...state,
        channel: payload
      };
    case FETCH_MSGS:
      return {
        ...state,
        msgs: payload
      };
    case ADD_MSG:
      return {
        ...state,
        msgs: [payload].concat(state.msgs)
      };
    default:
      return state;
  }
};

export default reducer;
