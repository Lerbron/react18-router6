const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const {
  isDev
} = require('./config')

exports.getCssLoaders = (importLoaders) => [
  MiniCssExtractPlugin.loader,
  {
    loader: 'css-loader',
    options: {
      modules: false,
      sourceMap: isDev,
      importLoaders,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      sourceMap: isDev,
      postcssOptions: {
        plugins: [
          [
            "postcss-preset-env",
          ],
        ],
      },
    },
  },
]