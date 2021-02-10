const DotenvWebpackPlugin = require('dotenv-webpack');
const path = require('path');

module.exports = {
  entry: {
    tasks: './webapp/src/tasks/main.js',
    worker: './webapp/src/worker/main.js',
    performance: './webapp/src/performance/main.js',
		workerschema: './schema/worker.js',
		taskschema: './schema/task.js',
		performanceschema: './schema/performance.js',
  },
  output: {
    path: path.resolve(__dirname, 'www'),
    filename: '[name].js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './webapp/www',
    port: 7000,
  },
	plugins: [
    new DotenvWebpackPlugin({
      path: './.env',
      safe: true,
    }),
  ],
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
