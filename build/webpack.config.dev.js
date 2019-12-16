'use strict'

const path = require('path');
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  mode: 'development',

  entry: [
    './src/app.js'
  ],

  devServer: {
    hot: true,
    watchOptions: {
      poll: true
    }
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
        use: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader',
        ]
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src')
    }
  },

  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      inject: true
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      jquery: 'jquery',
      'window.jQuery': 'jquery',
    })
  ]
}