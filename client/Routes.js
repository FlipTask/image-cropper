import React from "react";
import loadable from "@loadable/component";
import { fetchStories } from "./actions";

const Loading = () => <h1>Loading...</h1>;

const AppContainer = loadable(() => import(/* webpackChunkName: "appcontainer" */ "./AppContainer"), {
    fallback: <Loading />,
    ssr: true
});

const Home = loadable(() => import(/* webpackChunkName: "home" */ "./containers/Home"), {
    fallback: <Loading/>,
    ssr: true
});


export default [
    {
        component: AppContainer,
        routes: [
            {
                exact: false,
                path: "/",
                component: Home,
                /**
                 * this function will be called on server side.
                 * Please check /server/helpers/ServeWeb.js for better understanding
                 */
                loadData: (store, route, path, queryParams) => ([
                    store.dispatch(fetchStories(queryParams && (queryParams.page || 0)))
                ])
            }
        ]
    }
];
