'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = require('passport-local');

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_passport2.default.use(new _passportLocal.Strategy(function (username, password, done) {
  return _user2.default.findOne({ email: username }).then(function (resp) {
    return done(null, resp);
  }).catch(function (err) {
    return done(err);
  });
}));

_passport2.default.serializeUser(function (user, done) {
  done(null, user.id);
});

_passport2.default.deserializeUser(function (id, done) {
  _user2.default.findOne({ _id: id }).then(function (resp) {
    done(null, resp);
  });
});

exports.default = _passport2.default;