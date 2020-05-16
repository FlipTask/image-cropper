import React,{Component} from "react";
// import {withStyles} from "isomorphic-style-loader";
import StoryList from "./../../components/StoryList";

class Home extends Component{
    render(){
        const {meta} = this.props;
        return(
            <div className="row">
                <main className="card">
                    <StoryList />
                </main>
            </div>
        )
    }
}

export default Home;