const path = require("path");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = (env) => {
  const plugins = [];
  if (env.stats) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  return {
    mode: "production",
    entry: {
      getActivitiesRequest: "./src/getActivities/index.ts",
      getSignedURL: "./src/getSignedURL/index.ts",
      processActivityFileUpload: "./src/processActivityUpload/index.ts",
      getActivityByIdRequest: "./src/getActivityById/index.ts",
      getActivityTypeAggregation: "./src/getActivityTypeAggregation/index.ts",
      getStats: "./src/getStats/index.ts",
    },
    target: "node",
    resolve: {
      extensions: [".js", ".json", ".ts"],
    },
    externals: ["electron"],
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          use: "babel-loader",
          exclude: /node_modules/,
        },
      ],
    },
    output: {
      libraryTarget: "commonjs2",
      path: path.resolve(__dirname, "dist"),
      filename: "[name].js",
    },
    plugins,
  };
};
