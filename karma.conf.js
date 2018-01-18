const webpackConfig = require('./webpack.config.js');

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['mocha'],
        files: [
            'test/main.js'
        ],
        exclude: [
        ],
        preprocessors: {
            'test/main.js': ['webpack']
        },
        webpack: webpackConfig,
        reporters: ['progress'],
        port: 57233,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['Chrome'],
        singleRun: true,
        concurrency: Infinity
    })
};
