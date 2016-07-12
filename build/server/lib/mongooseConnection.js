'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectionFromMongooseCursor = undefined;

var _graphqlRelay = require('graphql-relay');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connectionFromMongooseCursor = exports.connectionFromMongooseCursor = function connectionFromMongooseCursor(cursor, args) {
  var after = args.after;
  var before = args.before;
  var first = args.first;
  var last = args.last;

  var afterOffset = after ? (0, _graphqlRelay.cursorToOffset)(after) : null,
      beforeOffset = before ? (0, _graphqlRelay.cursorToOffset)(before) : null;

  var limit = before ? last : first;
  var skip = before ? beforeOffset - limit : afterOffset;

  if (!skip || skip < 1) {
    skip = 0;
  }

  if (!limit) {
    limit = 20;
  }

  return cursor.count().then(function (count) {
    return cursor.find().skip(skip).limit(limit).exec().then(function (results) {
      var startCursor = void 0,
          endCursor = void 0;
      var edges = results.map(function (result, i) {
        if (!startCursor) {
          startCursor = (0, _graphqlRelay.offsetToCursor)(i + skip);
        }
        endCursor = (0, _graphqlRelay.offsetToCursor)(i + skip);
        return {
          cursor: (0, _graphqlRelay.offsetToCursor)(i + skip),
          node: result
        };
      });
      return {
        pageInfo: {
          startCursor: startCursor,
          endCursor: endCursor,
          hasPreviousPage: skip > 0,
          hasNextPage: skip + limit < count
        },
        edges: edges
      };
    });
  });
};