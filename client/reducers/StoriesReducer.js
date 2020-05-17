import {
    FETCH_STORIES_FAILURE,
    FETCH_STORIES_SUCCESS,
    FETCH_STORIES_PENDING
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
            ...state,
            error: false,
            loading: true
        };

    case FETCH_STORIES_SUCCESS:
        return {
            ...state,
            ...state,
            error: false,
            loading: false,
            data: payload
        };

    case FETCH_STORIES_FAILURE:
        return {
            ...state,
            ...state,
            error: true,
            loading: false
        };
    default:
        return state;
    }
};
