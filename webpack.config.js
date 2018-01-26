// webpack configuration file

const webpack = require('webpack');

module.exports = {
    entry: ["./src/entry.ts"],
    output: {
        filename: "build.js"
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                }
            }
        ],
        loaders: [
        ]
    },
    devtool: 'inline-source-map',
    devServer: {
        port: 57234,
        proxy: {
            "/api": {
                target: "http://localhost:5000",
                pathRewrite: {"^/api": ""}
            }
        },
        // Force the dev server to serve the index XHTML page
        historyApiFallback: {
            index: 'index.xhtml'
        }
    }
};
