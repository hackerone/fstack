'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nodeField = exports.nodeInterface = undefined;

var _graphqlRelay = require('graphql-relay');

var _registry = require('./lib/registry');

var _nodeDefinitions = (0, _graphqlRelay.nodeDefinitions)(_registry.idFetcher, _registry.typeResolver);

var nodeInterface = _nodeDefinitions.nodeInterface;
var nodeField = _nodeDefinitions.nodeField;
exports.nodeInterface = nodeInterface;
exports.nodeField = nodeField;