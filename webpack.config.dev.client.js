const { resolve } = require('path')
const { HotModuleReplacementPlugin, DefinePlugin, ProvidePlugin } = require('webpack')
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const TimeFixPlugin = require('time-fix-plugin')

const getDevConfiguration = () => {
  try {
    return {
      mode: 'development',
      entry: [
        resolve(__dirname, 'src', 'client', 'index.js'),
        'webpack-hot-middleware/client?path=/__webpack_hmr'
      ],
      output: {
        filename: 'bundle.js',
        path: resolve(__dirname, 'dist'),
        publicPath: `/client`,
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            include: resolve(__dirname, 'src', 'client'),
            use: [
              {
                loader: 'babel-loader',
                options: {
                  babelrc: true,
                  plugins: ['react-refresh/babel'],
                },
              },
            ],
          },
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },
        ],
      },
      resolve: {
        extensions: ['.js'],
        alias: {
          process: 'process/browser',
        },
      },
      plugins: [
        new TimeFixPlugin(),
        new HotModuleReplacementPlugin(),
        new ReactRefreshPlugin({
            overlay: {
            sockIntegration: 'whm',
          },
        }),
        new DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('development'),
          },
        }),
        new ProvidePlugin({
          process: 'process/browser',
        }),
      ],
      devtool: 'inline-source-map',
    }

  } catch (e){
    console.log('Error in webpack dev configuration: ', e)
  }
}

module.exports = getDevConfiguration()
