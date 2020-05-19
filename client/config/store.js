/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import Cookies from "universal-cookie";
import reducers from "../reducers";
import API from "./api";

const cookies = new Cookies();

// eslint-disable-next-line no-underscore-dangle
const composeEnhancer = (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
let enhancer = "";
if (process.env.NODE_ENV === "production") {
    enhancer = composeEnhancer(
        applyMiddleware(thunk.withExtraArgument({
            api: API,
            cookies
        }))
    );
} else {
    enhancer = composeEnhancer(
        applyMiddleware(thunk.withExtraArgument({
            api: API,
            cookies
        }))
    );
}
const preloadedState = window.__INITIAL_STATE__ || {};
delete window.__INITIAL_STATE__;
const store = createStore(
    reducers, // reducers
    preloadedState,
    enhancer
);

export default store;
