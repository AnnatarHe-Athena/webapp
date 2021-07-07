const webpack = require('webpack')
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const vendors = [
  'redux-saga',
  'whatwg-fetch',
  'redux',
  '@sentry/browser'
]

const utils = [
  'react',
  'react-dom',
  'react-redux',
  '@reach/router',
  'react-transition-group',
  '@apollo/client',
  'styled-components',
  'react-animation'
]

const plugins = [
  'sweetalert',
]

const config = {
  mode: process.env.NODE_ENV,
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: '[name]_[contenthash].dll.js',
    library: '[name]'
  },
  entry: {
    utils: utils,
    vendors: vendors,
    plugins: plugins
  },
  devtool: process.env.NODE_ENV !== 'production' ? 'eval-cheap-module-source-map' : false,
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
