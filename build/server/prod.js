'use strict';

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cdn = '/';
var assets = JSON.parse(Buffer('ewogICJtYWluLmNzcyI6ICI3MTBmM2NjZWI2ZjQzNzY5YTU2Yy9tYWluLmNzcyIsCiAgIm1haW4uanMiOiAiNzEwZjNjY2ViNmY0Mzc2OWE1NmMvYXBwLmpzIgp9', 'base64'));
var indexView = '<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset="utf-8">\n    <title>Prop Search</title>\n    <meta name="viewport" content="width=device-width, initial-scale=1">\n    <link rel="stylesheet" href="[main.css]" media="screen" />\n  </head>\n  <body>\n    <script src="[main.js]"></script>\n  </body>\n</html>\n'.replace('[main.js]', cdn + assets['main.js']).replace('[main.css]', cdn + assets['main.css']);

_app2.default.use(_express2.default.static(__dirname + '/../client'));
_app2.default.get('/', function (req, res) {
  res.send(indexView);
});

var ip = process.env.OPENSHIFT_NODEJS_IP || process.env.IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 9000;

_app2.default.listen(port, ip, function () {
  console.log('The server is running at http://localhost:' + port);
});