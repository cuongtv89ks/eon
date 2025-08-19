const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './apps/web/index.tsx', // Entry point for your application
  output: {
    path: path.resolve(__dirname, '../../dist/apps/web'), // Output directory
    filename: 'bundle.js', // Output bundle file name
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'], // Resolve these extensions
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js)$/,
        exclude: /node_modules\/(?!react-native)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript', '@babel/preset-flow']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './apps/web/index.html',
    }),
  ],
};