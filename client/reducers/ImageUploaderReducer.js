import {
    IMAGE_UPLOAD_FAILURE,
    IMAGE_UPLOAD_PENDING,
    IMAGE_UPLOAD_SUCCESS,
    SET_IMAGE_PROGRESS
} from "../constants/ActionTypes";

const INITIAL_STATE = {
    images: [
        {
            id: 0,
            name: "Horizontal",
            width: 755,
            height: 450,
            isLoading: false,
            loadingText: "",
            error: null
        },
        {
            id: 1,
            name: "Vertical",
            width: 365,
            height: 450,
            isLoading: false,
            loadingText: "",
            error: null
        },
        {
            id: 2,
            name: "Horizontal Small",
            width: 365,
            height: 212,
            isLoading: false,
            loadingText: "",
            error: null
        },
        {
            id: 3,
            name: "Gallery",
            width: 380,
            height: 380,
            isLoading: false,
            loadingText: "",
            error: null
        }
    ]
};

export default (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
    case IMAGE_UPLOAD_PENDING:
        return {
            ...state,
            images: state.images.map((obj) => {
                if (obj.id === payload.id) {
                    return {
                        ...obj,
                        isLoading: true,
                        loadingText: 0
                    };
                }
                return obj;
            })
        };
    case SET_IMAGE_PROGRESS:
        return {
            ...state,
            images: state.images.map((obj) => {
                if (obj.id === payload.id) {
                    return {
                        ...obj,
                        loadingText: payload.percentCompleted
                    };
                }
                return obj;
            })
        };
    case IMAGE_UPLOAD_SUCCESS:
        return {
            ...state,
            images: state.images.map((obj) => {
                if (obj.id === payload.id) {
                    return {
                        ...obj,
                        isLoading: false
                    };
                }
                return obj;
            })
        };
    case IMAGE_UPLOAD_FAILURE:
        return {
            ...state,
            images: state.images.map((obj) => {
                if (obj.id === payload.id) {
                    return {
                        ...obj,
                        isLoading: true,
                        error: "Unable to upload Image"
                    };
                }
                return obj;
            })
        };
    default:
        return state;
    }
};
