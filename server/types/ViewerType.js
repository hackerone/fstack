import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import {
  globalIdField,
  connectionDefinitions,
  connectionArgs,
} from 'graphql-relay';
import { connectionFromMongooseCursor } from 'lib/mongooseConnection';
import { nodeInterface, registerType } from 'lib/nodeRegistry';

import Bucket from 'models/Bucket';
import BucketType from 'types/BucketType';

const { connectionType: BucketConnection } = connectionDefinitions({ nodeType: BucketType });

const ViewerType = new GraphQLObjectType({
  name: 'Viewer',
  interfaces: [nodeInterface],
  fields: () => ({
    id: globalIdField('Viewer'),
    name: { type: GraphQLString },
    buckets: {
      type: BucketConnection,
      args: { ...connectionArgs },
      resolve: (root, args) => connectionFromMongooseCursor(
        Bucket.where({}).sort({ create_date: -1 }),
        args
      ),
    },
  }),
});

export const getViewer = (id) => {
  return {
    id: 1,
    name: 'Ganesh',
  };
};

export const ViewerQuery = {
  type: ViewerType,
  resolve: () => getViewer(),
};

export default registerType(ViewerType, getViewer);
