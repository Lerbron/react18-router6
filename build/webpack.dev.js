const { merge } = require('webpack-merge');
const webpack = require('webpack');
const path= require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const common = require('./webpack.common.js');
const proxySetting = require('./proxy');
const config = require('./config');

const setting= process.env.API_ENV == 'development' ? proxySetting.proxyDevSetting : proxySetting.proxyTestSetting


module.exports = merge(common, {
  target: 'web',
  mode: 'development',
  devtool: 'inline-source-map',
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2
        },
        vendor: {
          test: /[\\/]node_modules[\\/](react|react-dom|redux|react-redux|redux-thunk|react-loadable|react-router-dom|antd)[\\/]/,
          name: 'vendor',
          chunks: 'all',
        }
      }
    },
  },
  devServer: {
    host: config.SERVER_HOST,
    port: config.SERVER_PORT,
    historyApiFallback: true,
    compress: true,
    open: false,
    hot: true, // 热更新
    proxy: {
      ...setting
    }, // 代理配置
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].css',
      ignoreOrder: true,
    }),
  ],
});