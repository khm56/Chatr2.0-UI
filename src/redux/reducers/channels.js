import {
  SET_CHANNELS,
  CREATE_CHANNEL,
  SET_MESSAGES,
  SET_MESSAGE,
  SET_NEW_MESSAGES
} from "../actions/actionTypes";

const initialState = {
  channels: []
};

const reducer = (state = initialState, { type, payload, channelID }) => {
  switch (type) {
    case SET_CHANNELS:
      return {
        ...state,
        channels: [...payload]
      };
    case SET_MESSAGES:
      let channelz = state.channels.map(chan => {
        if (chan) {
          if (chan.id == channelID) {
            chan.messages = payload;
            return chan;
          } else return chan;
        }
      });

      return {
        ...state,
        channels: [...channelz]
      };
    case SET_MESSAGE:
      let channelz2 = state.channels.map(chan => {
        if (chan) {
          if (chan.id == channelID) {
            chan.messages = [...chan.messages, ...payload];
            return chan;
          } else return chan;
        }
      });

      return {
        ...state,
        channels: [...channelz2]
      };
    case CREATE_CHANNEL:
      return {
        ...state,
        channels: [payload, ...state.channels]
      };

    // case SET_NEW_MESSAGES:
    //   let channelz3 = state.channels.map(chan => {
    //     if (chan) {
    //       if (chan.id == channelID) {
    //         chan.messages = [...chan.messages, payload];
    //         return chan;
    //       } else return chan;
    //     }
    //   });

    //   return {
    //     ...state,
    //     messages: [...state.messages, ...newMessages]
    //   };
    default:
      return state;
  }
};

export default reducer;
