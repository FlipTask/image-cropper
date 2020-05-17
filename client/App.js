import React from "react";
import { renderRoutes } from "react-router-config";
import withStyles from "isomorphic-style-loader/withStyles";
import Routes from "./Routes";
import styles from "./scss/root.scss";

const App = () => (
    <div className={"container"}>
        {renderRoutes(Routes)}
    </div>
);

export default withStyles(styles)(App);
