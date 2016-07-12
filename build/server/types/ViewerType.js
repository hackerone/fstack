'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewerQuery = exports.getViewer = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _mongooseConnection = require('../lib/mongooseConnection');

var _node = require('../node');

var _Property = require('../models/Property');

var _Property2 = _interopRequireDefault(_Property);

var _PropertyType = require('./PropertyType');

var _PropertyType2 = _interopRequireDefault(_PropertyType);

var _registry = require('../lib/registry');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _connectionDefinition = (0, _graphqlRelay.connectionDefinitions)({ nodeType: _PropertyType2.default });

var PropertyConnection = _connectionDefinition.connectionType;


var ViewerType = new _graphql.GraphQLObjectType({
  name: 'Viewer',
  interfaces: [_node.nodeInterface],
  fields: function fields() {
    return {
      id: (0, _graphqlRelay.globalIdField)('Viewer'),
      name: { type: _graphql.GraphQLString },
      properties: {
        type: PropertyConnection,
        args: _extends({}, _graphqlRelay.connectionArgs),
        resolve: function resolve(root, args) {
          return (0, _mongooseConnection.connectionFromMongooseCursor)(_Property2.default.where({}).sort({ create_date: -1 }), args);
        }
      }
    };
  }
});

var getViewer = exports.getViewer = function getViewer(id) {
  return {
    id: 1,
    name: 'Ganesh'
  };
};

var ViewerQuery = exports.ViewerQuery = {
  type: ViewerType,
  resolve: function resolve() {
    return getViewer();
  }
};

exports.default = (0, _registry.registerType)(ViewerType, getViewer);