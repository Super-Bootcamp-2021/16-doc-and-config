const path = require('path');

module.exports = {
  entry: {
    tasks: './webapp/src/tasks/main.js',
    worker: './webapp/src/worker/main.js',
    performance: './webapp/src/performance/main.js',
  },
  output: {
    path: path.resolve(__dirname, 'www'),
    filename: '[name].js',
  },
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
    ],
  },
};
