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
        test: /\.(ts|tsx)$/, // Apply ts-loader for TypeScript files
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'apps/web/tsconfig.app.json', // Path to your tsconfig.app.json
          },
        },
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