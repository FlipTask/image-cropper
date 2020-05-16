import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import API from "./api";

let composeEnhancer =  (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
let enhancer = ""
if (process.env.NODE_ENV == 'production') {
    enhancer = composeEnhancer(
        applyMiddleware(thunk.withExtraArgument(API))
    );
} else {
    enhancer = composeEnhancer(
        applyMiddleware(thunk.withExtraArgument(API)),
    );
}
const preloadedState = window.__INITIAL_STATE__ || {};
delete window.__INITIAL_STATE__
const store = createStore(
    reducers,//reducers
    preloadedState,
    enhancer
);

export default store;
