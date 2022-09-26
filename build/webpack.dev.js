const { merge } = require('webpack-merge');
const webpack = require('webpack');
const path= require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const common = require('./webpack.common.js');
const proxySetting = require('./proxy');
const config = require('./config');
// var vendorAssets = require("./../dist/vendor-assets.json")

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
          test: /[\\/]node_modules[\\/](react|react-dom|redux|react-redux|redux-thunk|react-loadable|react-router-dom)[\\/]/,
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
    // clientLogLevel: 'error',
    // stats: "errors-only"
  },
  plugins: [
    // new webpack.DllReferencePlugin({
		// 	manifest: require(path.join(__dirname, './../dist', 'vendor.manifest.json')),
    //   context: __dirname
    // }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].css',
      ignoreOrder: true,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html',
      title: config.PROJECT_NAME,
      cache: false,
      inject: true,
      minify: {
        // 移除注释
        removeComments: true,
        // 不要留下任何空格
        collapseWhitespace: true,
        // 当值匹配默认值时删除属性
        removeRedundantAttributes: true,
        // 使用短的doctype替代doctype
        useShortDoctype: true,
        // 移除空属性
        removeEmptyAttributes: true,
        // 从style和link标签中删除type="text/css"
        removeStyleLinkTypeAttributes: true,
        // 保留单例元素的末尾斜杠。
        keepClosingSlash: true,
        // 在脚本元素和事件属性中缩小JavaScript(使用UglifyJS)
        minifyJS: true,
        // 缩小CSS样式元素和样式属性
        minifyCSS: true,
        // 在各种属性中缩小url
        minifyURLs: true
      }
    }),
  ],
});