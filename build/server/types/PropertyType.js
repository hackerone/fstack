'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProperty = undefined;

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _node = require('../node');

var _Property = require('../models/Property');

var _Property2 = _interopRequireDefault(_Property);

var _registry = require('../lib/registry');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PropertyType = new _graphql.GraphQLObjectType({
  name: 'Property',
  interfaces: [_node.nodeInterface],
  fields: function fields() {
    return {
      id: (0, _graphqlRelay.globalIdField)('Property'),
      title: { type: _graphql.GraphQLString },
      rightmoveId: { type: _graphql.GraphQLString },
      summary: { type: _graphql.GraphQLString },
      description: { type: _graphql.GraphQLString },
      type: { type: _graphql.GraphQLString },
      price: { type: _graphql.GraphQLInt },
      feesApply: { type: _graphql.GraphQLString },
      distance: { type: _graphql.GraphQLString },
      images: {
        type: new _graphql.GraphQLList(_graphql.GraphQLString)
      },
      availableDate: { type: _graphql.GraphQLString },
      propertyUrl: { type: _graphql.GraphQLString },
      create_date: { type: _graphql.GraphQLString }
    };
  }
});

var getProperty = exports.getProperty = function getProperty(id) {
  return _Property2.default.findOne({
    _id: id
  });
};

exports.default = (0, _registry.registerType)(PropertyType, getProperty);