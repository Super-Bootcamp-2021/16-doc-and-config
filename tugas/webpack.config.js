const path = require('path');
const DotenvWebpackPlugin = require('dotenv-webpack');

module.exports = {
  entry: {
    tasks: './webapp/src/tasks/main.js',
    worker: './webapp/src/worker/main.js',
    performance: './webapp/src/performance/main.js',
    schema: './schema/main.js',
  },
  output: {
    path: path.resolve(__dirname, 'www'),
    filename: '[name].js',
  },
  plugins: [
    new DotenvWebpackPlugin({
      path: './.env',
      safe: true,
    }),
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './webapp//www',
    port: 7000,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.yaml$/,
        use: [{ loader: 'json-loader' }, { loader: 'yaml-loader' }],
      },
    ],
  },
};
