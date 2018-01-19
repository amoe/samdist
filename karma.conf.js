const webpackConfig = require('./webpack.config.js');

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'karma-typescript'],
        files: [
            'test/*.ts'
        ],
        exclude: [
        ],
        preprocessors: {
            'test/*.ts': ['karma-typescript']
        },
        webpack: webpackConfig,
        reporters: ['progress'],
        port: 57233,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['ChromeHeadless'],
        singleRun: true,
        concurrency: Infinity
    })
};
