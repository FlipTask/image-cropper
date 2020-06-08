const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const LoadablePlugin = require("@loadable/webpack-plugin");
const BrotliPlugin = require("brotli-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    // Tell webpack to run babel on every file it runs through
    mode: "production",
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: ["babel-loader", "source-map-loader"],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new LoadablePlugin(),
        new CleanWebpackPlugin(),
        new UglifyJsPlugin({
            sourceMap: true,
            uglifyOptions: {
                warnings: false,
                parse: {},
                compress: {},
                mangle: true,
                output: null,
                toplevel: false,
                nameCache: null,
                ie8: false,
                keep_fnames: false
            }
        }),
        new BrotliPlugin({
            asset: "[path].br[query]",
            test: /\.js$|\.css$|\.html$/
        })
    ]
};
