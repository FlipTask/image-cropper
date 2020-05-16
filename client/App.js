import React, {Component} from "react";
import { renderRoutes } from "react-router-config";
import Routes from "./Routes";
import styles from  "./scss/root.scss";
import withStyles from 'isomorphic-style-loader/withStyles'
class App extends Component {
    render() {
        return (
            <div className={`container`}>
                {renderRoutes(Routes)}
            </div>
        );
    }
}

export default withStyles(styles)(App);
