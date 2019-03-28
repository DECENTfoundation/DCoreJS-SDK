module.exports = function(config) {
    config.set({
        frameworks: ["mocha", "karma-typescript"],
        files: [
            "test/**/*test.ts", // *.tsx for React Jsx
            "test/Helpers.ts",
            "src/**/*.ts"
        ],
        preprocessors: {
            "**/*.ts": "karma-typescript" // *.tsx for React Jsx
        },
        reporters: ["mocha", "karma-typescript"],
        browsers: ["ChromeHeadless"],
        singleRun: true
    });
};
