const { resolve } = require('path')
const { ProvidePlugin, DefinePlugin } = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
const TimeFixPlugin = require('time-fix-plugin')

const js = {
  test: /\.js$/,
  loader: 'babel-loader',
  include: resolve(__dirname, 'src'),
}
const css = {
  test: /\.css$/i,
  use: ['style-loader', 'css-loader'],
}

module.exports = {
    mode: 'production',
    entry: resolve(__dirname, 'src', 'client', 'index.js'),
    target: 'web',
    output: {
      path: resolve(__dirname, 'dist', 'client'),
      filename: 'bundle.js',
      publicPath: '/client/',
    },
    stats: {
      warnings: false,
    },
    resolve: {
      alias: {
        process: 'process/browser',
      },
    },
    plugins: [
      new TimeFixPlugin(),
      new DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new ProvidePlugin({
        process: 'process/browser',
      }),
      new CopyPlugin({
        patterns: [
          {
            from: resolve(__dirname, 'src','client', 'assets'),
            to: resolve(__dirname, 'client', 'assets'),
            noErrorOnMissing: true,
          },
        ],
      })
    ],
    module: {
      rules: [js, css],
    },
  }
