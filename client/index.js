/* global document */

import React from "react";
import {hydrate} from "react-dom";
import {Provider} from "react-redux";
import store from "./config/store";
import {Router} from "react-router-dom";
import History from "./config/history";
import App from "./App";
import { loadableReady } from '@loadable/component';
import "./scss/root.scss";


loadableReady(() => {
    console.log("Load Ready >>>");
    hydrate(
        <Provider store={store}>
            <Router history={History}>
                <App/>
            </Router>
        </Provider>
    , document.getElementById("root"));
});