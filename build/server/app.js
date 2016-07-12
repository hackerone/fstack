'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

require('babel-polyfill');

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use((0, _expressSession2.default)({
  secret: 'tomriddle',
  resave: true,
  saveUninitialized: true
}));

app.use('/graphql', (0, _expressGraphql2.default)(function (req) {
  return {
    schema: _schema2.default,
    rootValue: {
      user_id: req.user && req.user.id,
      user: req.user
    },
    graphiql: true
  };
}));

exports.default = app;