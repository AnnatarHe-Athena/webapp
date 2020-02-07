const path = require('path')
const webpack = require('webpack')
const config = require('./webpack.base.config')

config.target = 'web'
config.devtool = 'inline-source-map'
config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
)

config.devServer = {
    hot: true,
    port: 8080,
    contentBase: path.resolve(__dirname, '..'),
    historyApiFallback: true,
    proxy: {
        '/graphql/v1/*': {
            target: 'http://127.0.0.1:9009',
            // target: 'https://api.dbg.annatarhe.com',
            secure: false
        },
        '/public/*': {
            target: 'http://127.0.0.1:9009',
            secure: false
        }
    }
}

module.exports = config
