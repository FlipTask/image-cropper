import {
    FETCH_STORIES_FAILURE,
    FETCH_STORIES_SUCCESS,
    FETCH_STORIES_PENDING,
    UPVOTE_STORY,
    HIDE_STORY
} from "../constants/ActionTypes";

const INITIAL_STATE = {
    error: false,
    data: {
        hits: []
    },
    loading: false
};

export default (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
    case FETCH_STORIES_PENDING:
        return {
            ...state,
            error: false,
            loading: true
        };

    case FETCH_STORIES_SUCCESS:
        return {
            ...state,
            error: false,
            loading: false,
            data: payload
        };

    case FETCH_STORIES_FAILURE:
        return {
            ...state,
            error: true,
            loading: false
        };
    case UPVOTE_STORY:
        return {
            ...state,
            data: {
                ...state.data,
                hits: state.data.hits.map((obj) => {
                    if (obj.objectID === payload) {
                        obj.points += 1;
                        return obj;
                    }
                    return obj;
                })
            }
        };
    case HIDE_STORY:
        return {
            ...state,
            data: {
                ...state.data,
                hits: state.data.hits.map((obj) => {
                    if (obj.objectID === payload) {
                        obj.hidden = true;
                    }
                    return obj;
                })
            }
        };
    default:
        return state;
    }
};
