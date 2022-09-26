const path = require('path')
const webpack = require('webpack');
const config = require("./config")
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const WebpackBar = require("webpackbar");
const os = require('os');
const threadPool = os.cpus().length - 1;
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


const getApiEnv= () => {
  let api_env= process.env.API_ENV, url= './../config.js'
  switch (api_env) {
    case 'development':
      url= './../config.dev.js';
      break;
    case 'test':
      url= './../config.test.js';
      break
    case 'uat':
      url= './../config.uat.js';
      break
    default:
      url='./../config.js'
  }
  return url
}

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
                path.resolve(__dirname, './../src/assets/styles/common.scss')
              ]
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        use: [{
          loader: 'file-loader',
          options: {
            limit: 10 * 1024,
            name: "static/img/[name].[ext]",
            esModule: false
          },
        }],
      },
      {
        test: /\.(ttf|woff|woff2|eot|otf|svg)$/,
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
    // new webpack.IgnorePlugin(/\.\/locale/, /moment/),
		new FriendlyErrorsWebpackPlugin(),
    // new CopyPlugin({
    //   patterns: [
    //     { from: path.resolve(__dirname, getApiEnv()), to: path.resolve(__dirname , './../dist/config.js') },
    //     { from: path.resolve(__dirname, './../pdf'), to: path.resolve(__dirname , './../dist/pdf/') },
    //     { from: path.resolve(__dirname, './../favicon.ico'), to: path.resolve(__dirname , './../dist/favicon.ico') },
    //     { from: path.resolve(__dirname, './../libs'), to: path.resolve(__dirname , './../dist/libs') },
    //     { from: path.resolve(__dirname, './../public/s'), to: path.resolve(__dirname , './../dist/s') },
    //     { from: path.resolve(__dirname, './../wasms'), to: path.resolve(__dirname , './../dist/wasms') }
    //   ],
    // }),
  ],
	stats: "errors-only",

}