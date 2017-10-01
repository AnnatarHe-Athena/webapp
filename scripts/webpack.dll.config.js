const webpack = require('webpack')
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const split2 = [
  'react-router-redux',
  'immutable',
  'redux-saga',
  'babel-polyfill',
  'whatwg-fetch',
  'redux'
]

const split1 = [
  'react',
  'react-dom',
  'react-redux',
  'react-router',
  'react-addons-css-transition-group',
]

const split3 = [
  'react-apollo',
  'apollo-client',
  'styled-components',
  'graphql'
]

const config = {
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: '[name]_[hash].dll.js',
    library: '[name]'
  },
  entry: {
    utils: split1,
    vendors: split2,
    plugins: split3
  },
  devtool: '#source-map',
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
    // new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
  )
}


module.exports = config
