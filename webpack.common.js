const path = require('path');

module.exports = {
  entry: './src/main.ts',
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
    filename: 'soup.bundle.js',
    path: path.resolve(__dirname, 'build'),
    filename: 'soup.bundle.js',
    libraryTarget: 'var',
    library: 'Soup'
  },
};