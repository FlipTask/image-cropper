import {
    FETCH_STORIES_FAILURE,
    FETCH_STORIES_PENDING,
    FETCH_STORIES_SUCCESS,
    UPVOTE_STORY,
    HIDE_STORY
} from "../constants/ActionTypes";

const appName = require("../../package.json").name;

const upVoteTableName = `${appName}-upvotes`;
const hideStoryTableName = `${appName}-hidden`;

export const updateListWithPersistentData = (data = {}) => async (dispatch, getState, { cookies }) => {
    try {
        const hiddenStories = cookies.get(hideStoryTableName) || {};
        const upVoteStories = cookies.get(upVoteTableName) || {};
        return {
            ...data,
            hits: data.hits.map((obj) => {
                const myObj = obj;
                if (upVoteStories && upVoteStories[myObj.objectID]) {
                    myObj.points = parseInt(myObj.points, 10) + parseInt(upVoteStories[myObj.objectID], 10);
                }
                if (hiddenStories && hiddenStories[myObj.objectID]) {
                    myObj.hidden = true;
                }
                return myObj;
            })
        };
    } catch (e) {
        console.log("Running on server, Will Update on App Mount", e);
        return data;
    }
};

export const updateStoriesInStore = (data = {}) => async (dispatch) => {
    dispatch({
        type: FETCH_STORIES_SUCCESS,
        payload: data
    });
};

export const fetchStories = (page = 0) => async (dispatch, getState, { api }) => {
    try {
        dispatch({ type: FETCH_STORIES_PENDING });

        const res = await api.get(`/search?page=${page}&hitsPerPage=30`);
        const modifiedData = await dispatch(updateListWithPersistentData(res.data));
        dispatch(updateStoriesInStore(modifiedData));
    } catch (err) {
        console.log(err);
        dispatch({
            type: FETCH_STORIES_FAILURE
        });
    }
};

export const updateVoteInPersistent = (story) => async (dispatch, getState, { cookies }) => {
    try {
        const votes = cookies.get(upVoteTableName);
        const votesObj = votes || {};
        if (votesObj[story.objectID]) {
            votesObj[story.objectID] += 1;
        } else {
            votesObj[story.objectID] = 1;
        }
        cookies.set(upVoteTableName, JSON.stringify(votesObj), { path: "/" });
    } catch (e) {
        console.log(e);
    }
};

export const hideStoryInPersistent = (story) => async (dispatch, getState, { cookies }) => {
    try {
        const hiddenStories = cookies.get(hideStoryTableName);
        const stories = hiddenStories || {};
        stories[story.objectID] = true;
        cookies.set(hideStoryTableName, JSON.stringify(stories), { path: "/" });
    } catch (e) {
        console.log(e);
    }
};

export const updateUpVote = (story) => async (dispatch) => {
    try {
        dispatch(updateVoteInPersistent(story));
        dispatch({
            type: UPVOTE_STORY,
            payload: story.objectID
        });
    } catch (e) {
        console.log(e);
    }
};

export const hideStory = (story) => async (dispatch) => {
    dispatch(hideStoryInPersistent(story));
    dispatch({
        type: HIDE_STORY,
        payload: story.objectID
    });
};
