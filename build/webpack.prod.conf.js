const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const baseConf = require('./webpack.base.conf');

module.exports = merge(baseConf, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[chunkhash:8].css',
      chunkFilename: 'styles/[id].[chunkhash:8].css',
    }),
  ],
});
