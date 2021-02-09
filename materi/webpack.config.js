const path = require('path');
const { webpack } = require('webpack');

module.exports = {
  entry: {
    main: './src/main.js',
    assignment: './src/assignment/main.js',
  },
  output: {
    path: path.resolve(__dirname, 'www'),
    filename: '[name].js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './www',
    port: 5757,
  },
  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(require('./package.json').version),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
