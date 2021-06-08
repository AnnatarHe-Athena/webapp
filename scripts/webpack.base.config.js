const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AddAssertHtmlPlugin = require('add-asset-html-webpack-plugin')
const poststylus = require('poststylus')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
// const OfflinePlugin = require('offline-plugin')

const config = {
  mode: process.env.NODE_ENV,
  target: 'web',
  entry: [
    'whatwg-fetch',
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    publicPath: '/',
    filename: 'bundle.[contenthash].js'
  },
  module: {
    rules: [{
      test: /.jsx?$/,
      exclude: [/node_modules/, /__tests__/],
      use: ['babel-loader']
    }, {
      test: /.tsx?$/,
      exclude: [/node_modules/, /__tests__/],
      use: ['ts-loader']
    }, {
      test: /\.txt$/i,
      use: 'raw-loader',
      exclude: /node_modules/,
    },
    {
      test: /.styl$/,
      exclude: /node_modules/,
      use: [
        MiniCssExtractPlugin.loader, 'css-loader', 'stylus-loader'
      ],
    }, {
      test: /.css$/,
      exclude: [
        path.resolve(__dirname, '..', 'src', 'styles', 'tailwind.css'),
        /node_modules/,
      ],
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader?modules=true&sourceMap=true',
        'postcss-loader'
      ]
    }, {
      // test: /(tailwind)?.css$/,
      test: /.css$/,
      include: [
        path.resolve(__dirname, '..', 'src', 'styles', 'tailwind.css'),
        /node_modules/,
      ],
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader'
      ]
    }, {
      test: /\.(png|jpg|jpeg|gif)$/,
      use: [{ loader: 'url-loader', options: { limit: 500, name: '[name]-[hash].[ext]' } }],
      exclude: /node_modules/,
    }, {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      // exclude: /node_modules/,
      use: [{ loader: 'url-loader', options: { limit: 10000, mimetype: 'application/font-woff' } }]
    }, {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      // exclude: /node_modules/,
      use: [{ loader: 'url-loader', options: { limit: 10000, mimetype: 'application/font-woff' } }]
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      // exclude: /node_modules/,
      use: [{ loader: 'url-loader', options: { limit: 10000, mimetype: 'application/octet-stream' } }]
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      // exclude: /node_modules/,
      use: [{ loader: 'file-loader' }]
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      // exclude: /node_modules/,
      use: [{ loader: 'url-loader', options: { limit: 10000, mimetype: 'image/svg+xml' } }]
    }, {
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      // include: [path.resolve('..', '..', 'schema')],
      loader: 'graphql-tag/loader',
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'Athena webapp',
      template: path.resolve(__dirname, 'template.html'),
      inject: 'body',
      chunks: ['main', 'common', 'manifest', 'styles'],
    }),
    new MiniCssExtractPlugin({
      filename: "app.[contenthash].css",
      chunkFilename: "[id].[contenthash].css"
    }),
    new AddAssertHtmlPlugin({
      filepath: path.resolve(__dirname, '..', 'dist', '*.dll.js'),
      includeSourcemap: process.env.NODE_ENV !== 'production'
    }),
    new ScriptExtHtmlWebpackPlugin({
      inline: ['runtime']
    }),
    new webpack.DefinePlugin({
      __DEV__: process.env.NODE_ENV === 'development'
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true,
      stylus: {
        default: {
          use: [poststylus()]
        }
      }
    }),
    // new PurgecssPlugin({
    //   paths: glob.sync(path.join(__dirname, '..', 'src') + '/**/.[j|t]sx')
    // })
  ],
  optimization: {
    runtimeChunk: {
      name: 'manifest',
    },
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        vendor: {
          name: 'common',
          chunks: 'initial',
          priority: -10,
          reuseExistingChunk: false,
          // test: /node_modules\/(.*)\.js/,
        },
        styles: {
          name: 'styles',
          test: /\.(scss|css|less)$/,
          chunks: 'all',
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    },
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.styl'],
    alias: {
      AthenaSchema: path.resolve(__dirname, '..', process.env.DO_APPS_CI === 'true' ? 'schema' : '../schema'),
      AthenaComponents: path.resolve(__dirname, '..', 'src', 'components')
    }
  }
}

// your chunks name here
const dllRefs = ['vendors', 'utils', 'plugins']
dllRefs.forEach(x => {
  config.plugins.push(
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require(`../dist/${x}-manifest.json`)
    })
  )
})

// config.plugins.push(new OfflinePlugin())

module.exports = config
