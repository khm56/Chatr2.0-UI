import * as actionTypes from "./actionTypes";
import { resetErrors } from "./errors";
import axios from "axios";

export const fetchChannelDetail = channelID => {
    return async dispatch => {
        try {
            const res = await axios.get(
                `https://api-chatr.herokuapp.com/channels/${channelID}/`
            );
            const channel = res.data;
            dispatch({
                type: actionTypes.FETCH_CHANNEL_DETAIL,
                payload: channel
            });
        } catch (err) {
            console.error(err);
        }
    };
};

// export const postMessage = (message, channelID, user) => {
//   message = {
//     ...message,
//     channel: channelID,
//     user: user
//   };
//   return async dispatch => {
//     try {
//       const res = await axios.post(
//         `https://api-chatr.herokuapp.com/channels/${channelID}/send/`,
//         message
//       );
//       const newMessage = res.data;
//       dispatch({
//         type: actionTypes.FETCH_CHANNEL_DETAIL,
//         payload: newMessage
//       });
//     } catch (error) {
//       console.error(error.response.data);
//     }
//   };
// };
