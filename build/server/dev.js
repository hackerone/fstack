'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _webpack3 = require('./../webpack.dev');

var _webpack4 = _interopRequireDefault(_webpack3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var indexView = '<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset="utf-8">\n    <title>Prop Search</title>\n    <link rel="stylesheet" href="[main.css]" media="screen" />\n  </head>\n  <body>\n    <script src="[main.js]"></script>\n  </body>\n</html>\n'.replace('[main.js]', cdn + 'app.js').replace('[main.css]', cdn + 'main.css');

_app2.default.get('/', function (req, res) {
  res.send(indexView);
});

var compiler = (0, _webpack2.default)(_webpack4.default);

_app2.default.use((0, _webpackDevMiddleware2.default)(compiler, {
  publicPath: _webpack4.default.output.publicPath,
  contentBase: 'client',
  stats: { colors: true }
}));

_app2.default.use((0, _webpackHotMiddleware2.default)(compiler, {
  log: console.log
}));

_app2.default.listen(9000, function () {
  console.log('The server is running at http://localhost:' + 9000);
});