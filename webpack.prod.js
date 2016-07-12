require('babel-register');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const postCssImport = require('postcss-import');
const autoprefixer = require('autoprefixer');
const extractCSS = new ExtractTextPlugin('[hash]/[name].css');
const ManifestPlugin = require('webpack-manifest-plugin');


module.exports = {
  entry: [
    'eventsource-polyfill',
    path.join(__dirname, 'client/app.js'),
  ],
  output: {
    path: path.join(__dirname, 'build/client'),
    filename: '[hash]/app.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ minimize: true }),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
    }),
    extractCSS,
    new ManifestPlugin({
      fileName: 'assets.json',
      basePath: '',
    }),
  ],
  postcss: () => {
    postCssImport({
      path: ['./app/styles'],
    });
    return [autoprefixer];
  },
  module: {
    loaders: [
        { test: /\.js$/, loader: 'babel', exclude: /node_modules/, query: {
          presets: ['react', 'es2015'],
          plugins: [path.join(__dirname, '/tools/babelRelayPlugin')],
        },
      },
      {
        test: /\.(scss|css)$/,
        loader: extractCSS.extract('style-loader', ['css?modules', 'postcss', 'sass']),
      },
      {
        test: /\.svg$/,
        loader: 'file-loader',
      },
    ],
  },
  resolve: {
    root: path.resolve(__dirname, 'node_modules'),
    modulesDirectory: [path.resolve(__dirname, './node_modules')],
    extensions: ['', '.js', '.json', '.scss', '.css'],
    packageMains: ['browser', 'web', 'browserify', 'main', 'style'],
  },
};
