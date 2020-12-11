const path = require('path');
const { merge } = require('webpack-merge');

const baseConf = require('./webpack.base.conf');

module.exports = merge(baseConf, {
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.s?css/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    port: 8080,
  },
});
