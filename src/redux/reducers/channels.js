import * as actionTypes from "../actions/actionTypes";

const initialState = {
    channels: [],
};

const channelsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_CHANNELS:
            return {
                ...state,
                channels: action.payload,
            };

        case actionTypes.POST_CHANNEL:
            return {
                ...state,
                channels: [action.payload].concat(state.channels)
            };


        default:
            return state;
    }
};

export default channelsReducer;
