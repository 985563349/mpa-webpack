'use strict';

const glob = require('glob');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const PrettierPlugin = require('prettier-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const WebpackBar = require('webpackbar');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugin = [];

  const entryFiles = glob.sync(path.join(__dirname, '../src/pages/*/index.js'));

  entryFiles.forEach((entryFile) => {
    const match = entryFile.match(/pages\/(.+)\/index\.js$/);
    const filename = match && match[1];

    entry[filename] = entryFile;

    htmlWebpackPlugin.push(
      new HtmlWebpackPlugin({
        template: entryFile.replace(/\.js$/, '.html'),
        // 当前filename为index，打包为入口页面
        filename:
          filename === 'index' ? `${filename}.html` : `pages/${filename}.html`,
        chunks: [filename],
      })
    );
  });

  return {
    entry,
    htmlWebpackPlugin,
  };
};

const { entry, htmlWebpackPlugin } = setMPA();

module.exports = {
  entry,
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[chunkhash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [{ from: 'public', to: 'public' }],
    }),
    new PrettierPlugin(),
    new ESLintPlugin(),
    new WebpackBar(),
    new FriendlyErrorsWebpackPlugin(),
  ].concat(htmlWebpackPlugin),
};
