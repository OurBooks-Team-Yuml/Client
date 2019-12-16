'use strict'

const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  target: 'web',
  mode: 'production',
  entry: {
    app: './src/app.js',
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].[hash].js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          'vue-loader',
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      // Defining publicPath is needed in this setup with githubPages
      // to inject correct file path into vue and index file generated with `HtmlWebpackPlugin`.
      {
        test: /\.(png|jpe?g|gif|ico)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[hash].[ext]',
          outputPath: 'assets/images/',
          publicPath: 'dist/assets/images/'
        }
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'assets/fonts/',
          publicPath: 'dist/assets/fonts/'
        }
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {},
          },
          {
            loader: "sass-loader",
            options: {},
          },
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: 'src/index.html',
      inject: true
    }),

    // Emits css file for every entry point if needed. This let us divide css and js
    // into corresponding files rather then keeping everything inside js file.
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[name].[hash].css',
    }),

    // Removes unneded assets.
    new CleanWebpackPlugin({
      verbose: true,
      protectWebpackAssets: true,
      cleanOnceBeforeBuildPatterns: ['**/*', '!.gitkeep']
    }),
  ],
  optimization: {
    runtimeChunk: 'single',
    namedModules: true,
    noEmitOnErrors: true,
  },
}
