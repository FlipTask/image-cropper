/* eslint-disable no-undef */
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import Cookies from "universal-cookie";
import mockData from "../constants/mockData";
import * as actions from "../actions/index";
import * as types from "../constants/ActionTypes";
import * as reducers from "../reducers/StoriesReducer";

const cookies = new Cookies();
jest.mock("axios");
const middlewares = [thunk.withExtraArgument({
    api: axios,
    cookies
})];
const mockStore = configureMockStore(middlewares);

const store = mockStore(reducers.INITIAL_STATE);

describe("TESTING ACTIONS", () => {
    const response = mockData;
    const payload = response.hits[0];
    const expectedAction = [
        {
            type: types.FETCH_STORIES_PENDING
        }, {
            type: types.FETCH_STORIES_SUCCESS,
            payload: response
        },
        {
            type: types.UPVOTE_STORY,
            payload: payload.objectID
        }
    ];
    axios.get.mockResolvedValue({
        ...response
    });
    it(`${types.UPVOTE_STORY} ->`, () => {
        store
            .dispatch(actions.fetchStories(1))
            .then(() => expect(actions.updateUpVote(payload)).toEqual(expectedAction));
    });

    it(`${types.HIDE_STORY} ->`, () => {
        store
            .dispatch(actions.fetchStories(1))
            .then(() => expect(actions.hideStory(payload)).toEqual(expectedAction));
    });
});
