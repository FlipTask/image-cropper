import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import reducers from "./../../client/reducers";
import Cookies from 'universal-cookie';

export default (req) => {
    const cookies =  new Cookies(req.headers.cookie);
    const getUrl = () => {
        const apiUrl = process.env.API_URL;
        if(apiUrl.indexOf("http://") > -1 || apiUrl.indexOf("https://") > -1){
            return process.env.API_URL
        }else{
            return "http://"+process.env.API_URL
        }
    }
    const axiosInstance = axios.create({
        baseURL: `${getUrl()}/api/v1`,
        headers: {cookie: req.get('cookie') || ''}
    });

    const store = createStore(reducers, {}, applyMiddleware(thunk.withExtraArgument(axiosInstance)));
    return store;
};
