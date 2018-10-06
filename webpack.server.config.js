const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

const isProduction = process.env.NODE_ENV === 'production'
const productionPluginDefine = isProduction
  ? [
      new webpack.DefinePlugin({
        'process.env': { NODE_ENV: JSON.stringify('production') },
      }),
    ]
  : []

console.log('[webpack.server.config.js] __dirname: ', __dirname)
console.log('[webpack.server.config.js] process.cwd(): ', process.cwd())

module.exports = {
  devtool: 'sourcemap',
  entry: './server/index.js',
  output: {
    path: path.resolve('./server/dist/'),
    filename: 'build.js',
    libraryTarget: 'commonjs2',
    publicPath: '../public',
  },
  target: 'node',
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },
  externals: nodeExternals(),
  plugins: [
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false,
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
        test: /\.js$/,
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
        test: /\.json?$/,
        loader: 'json-loader',
      },
      {
        test: /\.less$/,
        use: [
          'css-loader/locals?modules&importLoaders=1&localIdentName=[name]---[local]---[hash:base64:5]',
          'less-loader',
        ],
      },
      {
        test: /\.css$/,
        loader:
          'css-loader/locals?modules&importLoaders=1&localIdentName=[name]---[local]---[hash:base64:5]',
      },
    ],
  },
}
