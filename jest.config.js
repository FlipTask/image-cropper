module.exports = {
    // presets: ["@babel/preset-env", "@babel/preset-react"],
    transformIgnorePatterns: ["<rootDir>/node_modules/"],
    transform: {
        "^.+\\.(js|jsx)?$": "babel-jest"
    }
};
