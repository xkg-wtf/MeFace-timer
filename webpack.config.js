const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const scssRule = {
  test: /\.scss$/,
  use: [
    {
      loader: "file-loader",
      options: {
        name: "styles/[name].bundle.css",
      },
    },
    {
      loader: "extract-loader",
    },
    {
      loader: "css-loader?-url",
    },
    {
      loader: "postcss-loader",
      options: {
        options: {},
      },
    },
    {
      loader: "sass-loader",
    },
  ],
};

// "watch": "yarn && concurrently \"webpack-dev-server\" \"webpack --watch --mode development\"",

const babelRule = {
  test: /\.(js|ts)$/,
  exclude: /(node_modules|bower_components)/,
  use: {
    loader: "babel-loader",
    options: {
      presets: ["@babel/preset-env"],
    },
  },
};

const htmlRule = {
  test: /\.html$/i,
  loader: "file-loader",
  options: {
    name: "[name].html",
  },
};

module.exports = {
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "scripts/[name].js",
  },
  resolve: {
    extensions: [".js"],
  },
  module: {
    rules: [scssRule, htmlRule, babelRule],
  },
  devServer: {
    contentBase: "./dist",
    hot: false,
    liveReload: true,
    watchContentBase: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin({
      patterns: [{ from: "./src/static", to: "static" }],
    }),
  ],
  entry: [
    "./src/scripts/main.js",
    "./src/styles/main.scss",
    "./src/index.html",
  ],
};
