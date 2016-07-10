import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql';
import {
  globalIdField,
  connectionDefinitions
} from 'graphql-relay';
import { connectionFromMongooseCursor } from 'lib/mongooseConnection';
import { nodeInterface } from '../node';
import Property from 'models/Property';
import PropertyType from 'types/PropertyType';
import { registerType } from 'lib/registry';

const {connectionType: PropertyConnection} = connectionDefinitions({nodeType: PropertyType});

const ViewerType = new GraphQLObjectType({
  name: 'Viewer',
  interfaces: [nodeInterface],
  fields: () => ({
    id: globalIdField('Viewer'),
    name: { type: GraphQLString },
    properties: {
      type: PropertyConnection,
      resolve: (root, args) => {
        return connectionFromMongooseCursor(
          Property.where({}).sort({ create_date: -1 }),
          args
        );
      }
    }
  })
});

export const getViewer = (id) => {
  return {
    id: 1,
    name: 'Ganesh'
  };
};

export const ViewerQuery = {
  type: ViewerType,
  resolve: () => getViewer()
};

export default registerType(ViewerType, getViewer);
