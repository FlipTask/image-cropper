const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = {

    target: 'web',
    entry: path.resolve(__dirname, '../../client/index.js'),
    module: {
        rules: [{
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    caller: {
                        name: "web"
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    "isomorphic-style-loader",
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                          importLoaders: 1
                        }
                    },
                    "sass-loader",
                ]
            },
        ]
    },
    // Tell webpack where to put the output file
    // that is generated

    output: {
        publicPath: "/static/",
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, '../../client-build'),
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        runtimeChunk: true,
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'main.css',
            ignoreOrder: false,
        }),
    ],
};

// console.log(JSON.stringify(merge.smart(config,baseConfig)));
module.exports = merge.smart(baseConfig, config);
