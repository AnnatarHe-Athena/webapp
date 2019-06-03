const webpack = require('webpack')
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const vendors = [
  'immutable',
  'redux-saga',
  'whatwg-fetch',
  'lodash',
  'redux'
]

const utils = [
  'react',
  'react-dom',
  'react-redux',
  '@reach/router',
  'react-transition-group',
  'react-apollo',
  'styled-components',
  'apollo-client'
]

const plugins = [
  'apollo-cache-inmemory',
  'apollo-link-error',
  'apollo-link-context',
  'apollo-link',
  'graphql'
]

const config = {
  mode: process.env.NODE_ENV,
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: '[name]_[hash].dll.js',
    library: '[name]'
  },
  entry: {
    utils: utils,
    vendors: vendors,
    plugins: plugins
  },
  devtool: process.env.NODE_ENV !== 'production' ? '#source-map' : false,
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, '..', 'dist', '[name]-manifest.json'),
      name: '[name]',
      context: __dirname
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static'
    })
  ]
}

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: '"production"' } })
  )
}


module.exports = config
