const path = require('path');

module.exports = {
  mode: "production",
  entry: './src/processActivityUpload/index.js',
  target: 'node',
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
  },
  output: {
    libraryTarget: "commonjs2",
    path: path.join(__dirname, "dist"),
    filename: "index.js",
  },
};