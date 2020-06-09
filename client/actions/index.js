import axios from "axios";
import {
    IMAGE_UPLOAD_FAILURE,
    IMAGE_UPLOAD_PENDING,
    IMAGE_UPLOAD_SUCCESS,
    SET_IMAGE_PROGRESS
} from "../constants/ActionTypes";

const delayForFlashingLoader = (time) => new Promise((resolve) => setTimeout(resolve, time));

export const getSignedUrl = ({ objectName, contentType }) => async (dispatch, getState, { api }) => {
    try {
        const res = await api.get("/signed-url", {
            params: {
                objectName,
                contentType
            }
        });
        return res.data;
    } catch (error) {
        return error;
    }
};

export const uploadImage = (file, id) => async (dispatch) => {
    dispatch({ type: IMAGE_UPLOAD_PENDING, payload: { id } });
    await delayForFlashingLoader(300);
    try {
        const formdata = new FormData();
        formdata.append("file", file);
        const signedurl = await dispatch(getSignedUrl({
            objectName: file.name,
            contentType: file.type
        }));
        if (signedurl.url) {
            await axios.put(
                signedurl.url,
                signedurl.destination === "local" ? formdata : file,
                {
                    headers: {
                        "Content-Type": file.type
                    },
                    onUploadProgress(progressEvent) {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        dispatch({
                            type: SET_IMAGE_PROGRESS,
                            payload: {
                                id,
                                percentCompleted
                            }
                        });
                    }
                }
            );
            dispatch({
                type: IMAGE_UPLOAD_SUCCESS,
                payload: {
                    id
                }
            });
        } else {
            dispatch({ type: IMAGE_UPLOAD_FAILURE, payload: { id } });
        }
    } catch (error) {
        dispatch({ type: IMAGE_UPLOAD_FAILURE, payload: { id } });
        // return error.respose.data;
    }
};
