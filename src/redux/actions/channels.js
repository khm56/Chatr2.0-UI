import * as actionTypes from "./actionTypes";
import { resetErrors } from "./errors";

import axios from "axios";



export const fetchChannels = () => {
    return async dispatch => {
        try {
            const res = await axios.get("https://api-chatr.herokuapp.com/channels/");
            const channels = res.data;
            dispatch({ type: actionTypes.FETCH_CHANNELS, payload: channels });
        } catch (err) {
            console.error(err);
        }
    };
};

// use it to post channel

// //POST THE AUTHOR TO https://the-index-api.herokuapp.com/api/authors/
// export const postAuthor = (newAuthor, resetForm, closeModal) => {
//   return async dispatch => {
//     try {
//       const res = await instance.post("/api/authors/", newAuthor);
//       const author = res.data;
//       dispatch(resetErrors());
//       dispatch({
//         type: actionTypes.POST_AUTHOR,
//         payload: author
//       });
//       dispatch(filterAuthors(""));
//       resetForm();
//       closeModal();
//     } catch (err) {
//       dispatch({
//         type: actionTypes.SET_ERRORS,
//         payload: err.response.data
//       });
//     }
//   };
// };
