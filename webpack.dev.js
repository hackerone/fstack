require('babel-register');
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var postCssImport = require('postcss-import');
var autoprefixer = require('autoprefixer');
var precss = require('precss');


var devFlagPlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
});

module.exports = {
    devtool: 'cheap-source-map',
    entry: [
        'eventsource-polyfill',
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        path.join(__dirname, 'client/app.js')
    ],
    output: {
        path: path.join(__dirname),
        publicPath: '/client/',
        filename: 'app.js',
        hot: true
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        }),
        devFlagPlugin
    ],
    postcss: function(webpack) {
        const importer = postCssImport({
            path: ['./app/styles']
        });
        return [autoprefixer];
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel', exclude: /node_modules/, query: {
              presets: ['react', 'es2015'],
              plugins: [path.join(__dirname, '/tools/babelRelayPlugin')]
            } },
            {
              test: /\.(scss|css)$/,
              loaders: ['style', 'css?modules', 'postcss', 'sass']
            },
            { test: /\.svg$/, loader: 'file-loader' }
        ]
    },
    resolve: {
        root: path.resolve(__dirname, 'node_modules'),
        modulesDirectory: [path.resolve(__dirname,'./node_modules'), ],
        extensions: ['', '.js', '.json', '.scss', '.css'],
        packageMains: ['browser', 'web', 'browserify', 'main', 'style']
    }
  };
