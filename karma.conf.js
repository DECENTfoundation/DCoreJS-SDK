/* tslint:disable */
module.exports = function (config) {
    config.set({
        browsers: ["Chrome_without_security"],
        customLaunchers: {
            Chrome_without_security: {
                base: "ChromeHeadless",
                flags: ["--disable-web-security"]
            }
        },
        client: {
            mocha: {
                timeout: "30000"
            }
        },
        files: [
            "test/**/*test.ts",
            "test/Helpers.ts",
            "src/**/*.ts"
        ],
        frameworks: ["mocha", "karma-typescript"],
        preprocessors: {
            "**/*.ts": "karma-typescript"
        },
        reporters: ["mocha", "karma-typescript"],
        karmaTypescriptConfig: {
            reports:
            {
                "lcovonly": {
                    "directory": "coverage",    // optional, defaults to 'coverage'
                    "subdirectory": "lcov", // optional, defaults to the name of the browser running the tests
                    "filename": "lcov.info", // optional, defaults to the report name
                },
                "html": "coverage",
                "text-summary": ""
            }
        },
        singleRun: true
    });
};
