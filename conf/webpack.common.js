const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  context: path.join(process.cwd(), 'src'), //the home directory for webpack

  devtool: 'source-map', // enhance debugging by adding meta info for the browser devtools

  entry: [
    'regenerator-runtime/runtime',
    './index.js'
  ],

  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: '[name].[hash].js',
    publicPath: '/',
    sourceMapFilename: '[name].map'
  },

  resolve: {
    extensions: ['.js'],  // extensions that are used
    modules: [path.join(process.cwd(), 'src'), 'node_modules'] // directories where to look for modules
  },

  module: {
    rules: [
      // {
      //   enforce: 'pre', //to check source files, not modified by other loaders (like babel-loader)
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   loader: 'eslint-loader'
      // },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              // publicPath: '../',
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          },
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    // new CleanWebpackPlugin(['dist'], {
    //   root: process.cwd()
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor'
    // }),
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ]
}
