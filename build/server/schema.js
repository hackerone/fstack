'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _ViewerType = require('./types/ViewerType');

var _node = require('./node');

var Schema = new _graphql.GraphQLSchema({
  query: new _graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
      viewer: _ViewerType.ViewerQuery,
      node: _node.nodeField
    }
  })
});

exports.default = Schema;