// webpack configuration file

module.exports = {
    entry: ["./entry.js"],
    output: {
        filename: "build.js"
    },
    module: {
        loaders: [
        ]
    },
    devtool: 'inline-source-map',
    devServer: {
        port: 57234
    }
};
