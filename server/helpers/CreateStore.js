import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import reducers from "./../../client/reducers";
import Cookies from 'universal-cookie';

export default (req) => {
    const cookies =  new Cookies(req.headers.cookie);
    const axiosInstance = axios.create({
        baseURL: `http://${process.env.API_URL}/api`,
        headers: {cookie: req.get('cookie') || ''}
    });

    const store = createStore(reducers, {}, applyMiddleware(thunk.withExtraArgument(axiosInstance)));
    return store;
};
