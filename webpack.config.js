// webpack configuration file

const webpack = require('webpack');

module.exports = {
    entry: ["./entry.ts"],
    output: {
        filename: "build.js"
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ],
        loaders: [
        ]
    },
    devtool: 'inline-source-map',
};
