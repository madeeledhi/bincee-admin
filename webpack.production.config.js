require('babel-polyfill')

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const StatsPlugin = require('stats-webpack-plugin')
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin')
const WebpackMd5Hash = require('webpack-md5-hash')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

function isExternal(module) {
  const userRequest = module.userRequest

  if (typeof userRequest !== 'string') {
    return false
  }

  return (
    userRequest.indexOf('bower_components') >= 0 ||
    userRequest.indexOf('node_modules') >= 0 ||
    userRequest.indexOf('libraries') >= 0
  )
}

module.exports = {
  entry: {
    app: path.resolve('./client/pages/app.js'),
  },
  output: {
    path: path.resolve('./client/dist/'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
    new ExtractTextPlugin('[name]-[chunkhash].min.css'),
    new StatsPlugin('webpack.stats.json', {
      source: false,
      modules: false,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.CONFIG': JSON.stringify(process.env.CONFIG),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        return isExternal(module)
      },
    }),
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
    }),
    new WebpackMd5Hash(),
    new ManifestPlugin(),
    new ChunkManifestPlugin({
      filename: 'chunk-manifest.json',
      manifestVariable: 'webpackManifest',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.worker\.js$/,
        use: {
          loader: 'worker-loader',
          options: { inline: true, fallback: false },
        },
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          plugins: [
            'add-module-exports',
            'transform-decorators-legacy',
            'jsx-control-statements',
          ],
          presets: [
            'flow',
            ['env', { modules: 'commonjs' }],
            'react',
            'stage-0',
          ],
        },
      },
      {
        test: /\.js$/,
        loader: 'ify-loader',
      },
      {
        test: /\.json?$/,
        loader: 'json-loader',
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192',
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader?modules&localIdentName=[name]---[local]---[hash:base64:5]',
            'less-loader',
          ],
        }),
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader?modules&localIdentName=[name]---[local]---[hash:base64:5]',
          ],
        }),
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream',
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
      },
    ],
  },
}
