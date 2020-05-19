const path = require("path");
const merge = require("webpack-merge");
const {
    CleanWebpackPlugin
} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const baseConfig = require("./webpack.base");

const config = {

    target: "web",
    entry: path.resolve(__dirname, "../../client/index.js"),
    module: {
        rules: [{
            test: /\.js?$/,
            loader: "babel-loader",
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
                    loader: "css-loader",
                    options: {
                        importLoaders: 1
                    }
                },
                "sass-loader"
            ]
        }
        ]
    },
    // Tell webpack where to put the output file
    // that is generated

    output: {
        publicPath: "/static/",
        filename: "[name].bundle.js",
        chunkFilename: "[name].bundle.js",
        path: path.resolve(__dirname, "../../client-build")
    },
    stats: {
        colors: false,
        hash: true,
        timings: true,
        assets: true,
        chunks: true,
        chunkModules: true,
        modules: true,
        children: true
    },
    optimization: {
        minimizer: [
            new UglifyJSPlugin({
                sourceMap: true,
                uglifyOptions: {
                    compress: {
                        inline: false
                    }
                }
            })
        ],
        runtimeChunk: false,
        splitChunks: {
            cacheGroups: {
                default: false,
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor_app",
                    chunks: "all",
                    minChunks: 2
                }
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "main.css",
            ignoreOrder: false
        })
    ]
};

// console.log(JSON.stringify(merge.smart(config,baseConfig)));
module.exports = merge.smart(baseConfig, config);
