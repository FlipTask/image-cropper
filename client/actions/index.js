/* eslint-disable import/prefer-default-export */
import {
    FETCH_STORIES_FAILURE,
    FETCH_STORIES_PENDING,
    FETCH_STORIES_SUCCESS
} from "../constants/ActionTypes";

export const fetchStories = (page = 0) => async (dispatch, getState, api) => {
    try {
        dispatch({ type: FETCH_STORIES_PENDING });

        const res = await api.get(`/search?page=${page}&hitsPerPage=30`);
        // console.log(res);
        dispatch({
            type: FETCH_STORIES_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: FETCH_STORIES_FAILURE
        });
    }
};
