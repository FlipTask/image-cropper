const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const webpackNodeExternals = require('webpack-node-externals');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const config = {

    // Inform webpack that we are building a bundle
    // for 'nodeJs', rather than for the browser

    target: 'node',
    module:{
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    caller: { name: "node" },
                    // presets: ["@babel/preset-env"]
                }
            },
            {
                test: /\.scss$/,
                use: [
                    "isomorphic-style-loader",
                    {
                        loader: 'css-loader',
                        options: {
                          importLoaders: 1
                        }
                    },
                    "sass-loader",
                ]
            }
        ]  
    },
    //Tell webpack the root file of our
    //server Application
    node: {
        // Need this when working with express, otherwise the build fails
        __dirname: false, // if you don't put this is, __dirname
        __filename: false, // and __filename return blank or /
    },
    entry: {
       server: path.resolve(__dirname, '../../server/server.js')
    },
    
    // Tell webpack where to put the output file
    // that is generated

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../../server-build'),
        globalObject: 'this'
    },
    plugins: [
        new CleanWebpackPlugin(),
    ],
    externals: [webpackNodeExternals()],
};
// console.log(JSON.stringify(merge(baseConfig, config)));
module.exports = merge.smart(baseConfig, config);
