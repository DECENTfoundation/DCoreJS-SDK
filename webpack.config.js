module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: "./src/index.ts",
  output: {
    filename: "index.js"
  },
  node: {
    fs: "empty",
    net: "empty",
    tls: "empty"
  },
  target: "node",
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.ts?$/, loader: "ts-loader" }
    ]
  }
};
