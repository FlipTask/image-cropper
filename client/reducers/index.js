import {combineReducers} from 'redux';
import StoriesReducer from "./StoriesReducer";

export default combineReducers({
    stories: StoriesReducer
});