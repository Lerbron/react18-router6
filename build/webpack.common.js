const path = require('path')
const webpack = require('webpack');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AntdDayjsWebpackPlugin= require('antd-dayjs-webpack-plugin');
const WebpackBar = require("webpackbar");
const os = require('os');
const threadPool = os.cpus().length - 1;
const config = require('./config');
// const CopyPlugin = require('copy-webpack-plugin');

class Reporter {
  done(context) {
    if (config.isDev) {
      console.clear();
      console.log(`启动成功:${config.SERVER_HOST}:${config.SERVER_PORT}`);
    }
  }
}

const {
  getCssLoaders
} = require("./utils");


// const getApiEnv= () => {
//   let api_env= process.env.API_ENV, url= './../config.js'
//   switch (api_env) {
//     case 'development':
//       url= './../config.dev.js';
//       break;
//     case 'test':
//       url= './../config.test.js';
//       break
//     case 'uat':
//       url= './../config.uat.js';
//       break
//     default:
//       url='./../config.js'
//   }
//   return url
// }

module.exports = {
  entry: path.resolve(__dirname, "../src/index.js"),
  output: {
    filename: 'js/[name].[chunkhash:8].js',
    chunkFilename: 'js/[name].[chunkhash:8].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: "/",
  },
  module: {
    rules: [{
        test: /\.(tsx?|jsx?)$/,
        use: [{
            loader: 'thread-loader',
            options: {
              workers: threadPool // 进程2个
            }
          },
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            },
          }
        ],

        exclude: [/node_modules/],
      },
      {
        test: /\.css$/,
        use: getCssLoaders(1),
        // exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          ...getCssLoaders(2),
          {
            loader: 'sass-loader',
            options: {
              sourceMap: config.isDev
            },
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                path.resolve(__dirname, './../src/assets/styles/common.scss'),
                path.resolve(__dirname, './../src/assets/styles/themes/mixin.scss'),
              ]
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
        type: 'asset/resource',
        generator: {
          filename: 'static/[hash][ext][query]'
        }
        // use: [{
        //   loader: 'file-loader',
        //   options: {
        //     limit: 10 * 1024,
        //     name: "static/img/[name].[ext]",
        //     esModule: false
        //   },
        // }],
      },
      {
        test: /\.(ttf|woff|woff2|eot|otf)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: "static/font/[name].[ext]",
            esModule: false
          },
        }],
      },
    ]
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, '../src'),
    },
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
  },
  plugins: [  
    new WebpackBar({
      name: config.isDev ? "正在启动" : "正在打包",
      color: "#fa8c16",
      reporter: new Reporter()
    }),
    new CaseSensitivePathsPlugin(),
		new FriendlyErrorsWebpackPlugin(),
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
    new AntdDayjsWebpackPlugin(),
    // new webpack.IgnorePlugin({
    //   resourceRegExp: /^\.\/locale$/,
    //   contextRegExp: /moment$/,
    // })

  ],
	stats: "errors-only",

}