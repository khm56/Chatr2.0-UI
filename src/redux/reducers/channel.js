import * as actionTypes from "../actions/actionTypes";

const initialState = {
    channel: [],
    // filteredMessages: [],
};

const channelReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_CHANNEL_DETAIL:
            return {
                ...state,
                channel: action.payload
            };
        // case actionTypes.POST_MESSAGE:
        //   return {
        //     ...state,
        //     channel: state.channels.concat(action.payload)
        //   };

        default:
            return state;
    }
};

export default channelReducer;
