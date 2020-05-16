/* global document */

import React from "react";
import {hydrate} from "react-dom";
import {Provider} from "react-redux";
import store from "./config/store";
import {Router} from "react-router-dom";
import History from "./config/history";
import App from "./App";
import {loadableReady} from '@loadable/component';
import StyleContext from 'isomorphic-style-loader/StyleContext'

const insertCss = (...styles) => {
    const removeCss = styles.map(style => style._insertCss())
    return () => removeCss.forEach(dispose => dispose())
}

loadableReady(() => {
    console.log("Load Ready >>>");
    hydrate(
        <Provider store={store}>
            <StyleContext.Provider value={{ insertCss }}>
                <Router history={History}>
                    <App/>
                </Router>
            </StyleContext.Provider>
    </Provider>, document.getElementById("root"));
});