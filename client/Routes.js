import React from "react";
import loadable from "@loadable/component";

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
                component: Home
            }
        ]
    }
];
