'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typeResolver = exports.idFetcher = exports.registerType = undefined;

var _graphqlRelay = require('graphql-relay');

var types = {};
var resolvers = {};

var registerType = exports.registerType = function registerType(type, resolver) {
  types[type.name] = type;
  resolvers[type.name] = resolver;
  return type;
};

var idFetcher = exports.idFetcher = function idFetcher(globalId) {
  var _fromGlobalId = (0, _graphqlRelay.fromGlobalId)(globalId);

  var type = _fromGlobalId.type;
  var id = _fromGlobalId.id;

  var output = null;
  if (resolvers[type]) {
    var result = resolvers[type].apply(null, [id]);
    if (typeof result === 'function') {
      output = result.then(function (resp) {
        return Object.assign({}, resp, { type: type });
      });
    } else {
      output = Object.assign({}, result, { type: type });
    }
  }
  return output;
};

var typeResolver = exports.typeResolver = function typeResolver(obj) {
  return types[obj.type];
};