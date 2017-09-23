const config = require('./webpack.base.config')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

config.output.publicPath = '/'

config.plugins.push(
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new WebpackPwaManifest({
      name: 'Athena',
      short_name: 'athena',
      description: 'Athena - site',
      background_color: '#ffffff',
      icons: [
        // {
        //   src: path.resolve('src/assets/icon.png'),
        //   sizes: [96, 128, 192, 256, 384, 512]
        // },
        // {
        //   src: path.resolve('src/assets/large-icon.png'),
        //   size: '1024x1024'
        // }
      ]
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static'
    })
  // new CopyWebpackPlugin([{ from: './src/registerServiceWorker.js' }])
)

module.exports = config
