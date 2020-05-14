import React, {Component} from "react";
import {renderRoutes} from "react-router-config";
  

class AppContainer extends Component {
    render() {
        return (
            <React.Fragment>
                {renderRoutes(this.props.route.routes)}
            </React.Fragment>
        );
    }
}


export default AppContainer;