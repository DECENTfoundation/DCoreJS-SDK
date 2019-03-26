module.exports = function(config) {
    config.set({
        frameworks: ["mocha", "karma-typescript"],
        files: [
            "test/**/*1.ts", // *.tsx for React Jsx
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
