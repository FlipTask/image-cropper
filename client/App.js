import React, {Component} from "react";
import { renderRoutes } from "react-router-config";
import Routes from "./Routes";

class App extends Component {
    render() {
        return (
            <div className="page--container">
                {renderRoutes(Routes)}
            </div>
        );
    }
}

export default App;
