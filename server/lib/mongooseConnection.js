import {
  offsetToCursor,
  cursorToOffset,
} from 'graphql-relay';
import Promise from 'bluebird';

export const connectionFromMongooseCursor = (cursor:Object, args:Object) => {
  const { after, before, first, last } = args;
  const afterOffset = after ? cursorToOffset(after) : null;
  const beforeOffset = before ? cursorToOffset(before) : null;

  let limit = before ? last : first;
  let skip = before ? beforeOffset - limit : afterOffset;

  if (!skip || skip < 1) {
    skip = 0;
  }

  if (!limit) {
    limit = 20;
  }

  return cursor.count()
    .then(count => cursor
        .find()
        .skip(skip)
        .limit(limit)
        .exec()
        .then(results => {
          let startCursor;
          let endCursor;
          const edges = results.map((result, i) => {
            if (!startCursor) {
              startCursor = offsetToCursor(i + skip);
            }
            endCursor = offsetToCursor(i + skip);
            return {
              cursor: offsetToCursor(i + skip),
              node: result,
            };
          });
          return {
            pageInfo: {
              startCursor,
              endCursor,
              hasPreviousPage: skip > 0,
              hasNextPage: skip + limit < count,
            },
            edges,
          };
        })
    );
};
