import React from "react";
import StoryList from "../../components/StoryList";
import Graph from "../../components/Graph";

const Home = () => (
    <div className="row">
        <main className="card">
            <StoryList/>
            <Graph />
        </main>
    </div>
);

export default Home;
