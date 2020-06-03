const path = require('path');

module.exports = {
  entry: './src/soup.ts',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: 'soup.min.js',
    path: path.resolve(__dirname, 'build'),
    libraryTarget: 'umd',
    //library: 'Soup'
  },
};