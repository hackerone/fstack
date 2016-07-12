'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = _bluebird2.default;

var DB_NAME = 'prop';
var db = DB_NAME;

if (process.env.TEST) {
  db = 'test';
}

_mongoose2.default.connect('mongodb://localhost/' + db);

exports.default = _mongoose2.default;