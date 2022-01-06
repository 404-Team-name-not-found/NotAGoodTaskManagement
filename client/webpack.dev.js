const path = require("path");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const common = require("./webpack.common");
module.exports = merge(common, {
    entry: {
        main: "./src/index.js",
        vendor: "./src/vendor.js"
    },
    mode: "development",
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader", 
                    "sass-loader"
                ]
            }
        ]
    }
});