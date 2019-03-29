module.exports = function (config) {
    config.set({
        browsers: ["ChromeHeadless"],
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
