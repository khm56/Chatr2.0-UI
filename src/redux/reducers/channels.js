import {
  SET_CHANNELS,
  CREATE_CHANNEL,
  SET_MESSAGES,
  SET_MESSAGE,
  SET_NEW_MESSAGES,
  SET_SINGLE_MESSAGE
} from "../actions/actionTypes";

const initialState = {
  channels: [],
  newMessage: false,
  visited: []
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
        //why are you checking if chan exists in a map it only goes over objects in the array that do exist
        if (chan) {
          if (chan.id == channelID) {
            chan.messages = payload;
            return chan;
          } else return chan;
        }
      });
      //Delete your console.logs when you're done debugging
      console.log(state.visited);
      return {
        ...state,
        channels: [...channelz],
        visited: [...state.visited, channelID]
      };
    case SET_MESSAGE:
      // as mentioned in the actions earlier you could have done both fetching with and without a timestamp with one action
      let channelz2 = state.channels.map(chan => {
        if (chan) {
          if (chan.id == channelID) {
            let channel = chan;
            if (chan.messages.length > 0) {
              channel.messages = [...chan.messages, ...payload];
            } else {
              channel.messages = [...payload];
            }

            return channel;
          } else return chan;
        }
      });

      return {
        ...state,
        channels: [...channelz2],
        newMessage: payload.length > 0
      };

    case CREATE_CHANNEL:
      return {
        ...state,
        channels: [payload, ...state.channels]
      };
    case "SET_NEW_MESSAGE_FALSE":
      return {
        ...state,
        newMessage: false
      };
    case "SAVE_DRAFT":
      let channelz5 = state.channels.map(chan => {
        if (chan) {
          if (chan.id == channelID) {
            chan.draft = payload;
            return chan;
          } else return chan;
        }
      });

      return {
        ...state,
        channels: [...channelz5]
      };
    case "SET_LENGTH":
      let channelz6 = state.channels.map(chan => {
        if (chan) {
          if (chan.id == channelID) {
            chan.unread = payload;
            return chan;
          } else return chan;
        }
      });

      return {
        ...state,
        channels: payload > 0 ? [...channelz6] : state.channels
      };

    default:
      return state;
  }
};

export default reducer;
