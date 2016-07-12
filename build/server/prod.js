'use strict';

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cdn = '/';
var assets = JSON.parse(Buffer('ewogICJtYWluLmNzcyI6ICIzYjhiZGNlODRhMTQ5M2I2NzI5Mi9tYWluLmNzcyIsCiAgIm1haW4uanMiOiAiM2I4YmRjZTg0YTE0OTNiNjcyOTIvYXBwLmpzIgp9', 'base64'));
var indexView = '<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset="utf-8">\n    <title>Prop Search</title>\n    <link rel="stylesheet" href="[main.css]" media="screen" />\n  </head>\n  <body>\n    <script src="[main.js]"></script>\n  </body>\n</html>\n'.replace('[main.js]', cdn + assets['main.js']).replace('[main.css]', cdn + assets['main.css']);

_app2.default.use(_express2.default.static('build/client'));
_app2.default.get('/', function (req, res) {
  res.send(indexView);
});

_app2.default.listen(9000, function () {
  console.log('The server is running at http://localhost:' + 9000);
});