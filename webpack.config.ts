import { Configuration } from 'webpack';
import path from 'path';
import webpackNodeExternals from 'webpack-node-externals';

const config: Configuration = {
  target: 'node',
  mode: 'development',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  externals: [webpackNodeExternals()],
};

export default config;
