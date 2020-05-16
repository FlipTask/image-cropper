import React from "react";
import path from "path";
import { renderToNodeStream } from "react-dom/server"
import { ChunkExtractor } from "@loadable/server"
import {Provider} from "react-redux";
import {StaticRouter} from "react-router";
import StyleContext from 'isomorphic-style-loader/StyleContext'
import App from "./../../client/App";
import getHTML from "./HTML";
const webStats = path.resolve(__dirname,"./../client-build/loadable-stats.json");

export default (req, store, context) => {
    return new Promise((resolve,reject) => {
        const css = new Set(); // CSS for all rendered React components
        const insertCss = (...styles) => styles.forEach(style => css.add(style._getCss()));
        
        const InitialComponent = (
            <Provider store={store}>
                <StyleContext.Provider value={{ insertCss }}>
                    <StaticRouter location={req.url} context={context}>
                        <App />
                    </StaticRouter>
                </StyleContext.Provider>
            </Provider>
        );
        const webExtractor = new ChunkExtractor({statsFile: webStats});
        
        const JSX = webExtractor.collectChunks(InitialComponent);
        const htmlChunks = renderToNodeStream(JSX);
        let chunks = [];
        htmlChunks.on("data",(chunk) => {
            chunks.push(chunk.toString());
        })
        
        htmlChunks.on('end', () => {  
            const htmlTemplate = getHTML({
                store: store.getState(),
                inlineCSS: [...css].join(''),
                styleTags: webExtractor.getStyleTags(),
                linkTags: webExtractor.getLinkTags(),
                scriptTags: webExtractor.getScriptTags(),
                html: chunks.join("")
            })
            resolve(htmlTemplate); 
        });
        // resolve(page);
    }).catch(err => {
        console.log("------------ERROR IN RENDERER------------------");
        throw err;
    })
};