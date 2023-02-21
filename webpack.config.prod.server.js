const { resolve } = require('path')
const { DefinePlugin } = require('webpack')
const nodeExternals = require('webpack-node-externals')
const TimeFixPlugin = require('time-fix-plugin')

const js = {
  test: /\.js$/,
  loader: 'babel-loader',
  include: resolve(__dirname, 'src'),
}

const css = {
  test: /\.css$/i,
  use: [
    {
      loader: 'css-loader',
      options: {
        esModule: false,
      },
    },
  ],
}

module.exports = {
  mode: 'production',
  entry: resolve(__dirname, 'src', 'server'),
  target: 'node',
  node: {
    __dirname: false,
  },
  externals: [nodeExternals()],
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  stats: {
    warnings: false,
  },
  plugins: [
    new TimeFixPlugin(),
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    })
  ],
  module: {
    rules: [js, css],
  },
}