import React from "react";

const Loader = ({ progress = 0, error = null }) => (
    <div className="loader-wrapper">
        <div className="loader">
            <div className="bar" style={{
                width: `${progress}%`
            }}></div>
            <span className={`progress-text ${error ? "text-danger" : ""}`}>
                {
                    error || `${progress}%`
                }
            </span>
        </div>
    </div>
);

export default Loader;
