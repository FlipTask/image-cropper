import { combineReducers } from "redux";
import imageReducer from "./ImageUploaderReducer";

export default combineReducers({
    imageHolders: imageReducer
});
