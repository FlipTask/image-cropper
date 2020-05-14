import React,{Component} from "react";
import {connect} from "react-redux";

class Home extends Component{
    render(){
        const {meta} = this.props;
        return(
            <div className="container">
                <div className="row">
                    Hello World !!
                </div>
            </div>
        )
    }
}

export default Home;