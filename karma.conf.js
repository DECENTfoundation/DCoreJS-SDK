module.exports = function (config) {
    config.set({
        browsers: ["Chrome_without_security"],
        customLaunchers:{
            Chrome_without_security:{
                base: 'ChromeHeadless',
                flags: ['--disable-web-security']
            }
        },
        client: {
            mocha: {
                timeout: "20000",
            },
        },
        files: [
            "test/**/*test.ts",
            "test/Helpers.ts",
            "src/**/*.ts",
        ],
        frameworks: ["mocha", "karma-typescript"],
        preprocessors: {
            "**/*.ts": "karma-typescript",
        },
        reporters: ["mocha", "karma-typescript"],
        singleRun: true,
    });
};
