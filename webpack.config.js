const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env) => {
  const plugins = [];
  if (env.stats) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  return {
    mode: "production",
    entry: './src/processActivityUpload/index.ts',
    target: 'node',
    resolve: {
      extensions: [".js", ".json", ".ts"],
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
      ],
    },
    output: {
      libraryTarget: "commonjs2",
      path: path.join(__dirname, "dist"),
      filename: "index.js",
    },
    plugins
  }
};