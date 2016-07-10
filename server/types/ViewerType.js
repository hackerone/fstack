import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} from 'graphql';
import {
  globalIdField,
  connectionDefinitions,
  connectionArgs
} from 'graphql-relay';
import {connectionFromMongooseCursor} from 'lib/mongooseConnection';
import node from '../node';
import Property from 'models/Property';

const {connectionType: PropertyConnection} =
    connectionDefinitions({nodeType: PropertyType});

export const ViewerType = new GraphQLObjectType({
  name: 'Viewer',
  interfaces: [node.interface],
  fields: () => ({
    id: globalIdField('Viewer'),
    name: {type: GraphQLString},
    properties: {
      type: PropertyConnection,
      resolve: (root, args) => {
        return connectionFromMongooseCursor(
          Property.sort({create_date: -1}),
          args
        );
      }
    }

  })
});

export const getViewer = (id: ?number) => {
  return {
    id: 1,
    name: 'Ganesh'
  }
};

export const Viewer = {
  type: ViewerType,
  interfaces: [node.interface],
  resolve: () => getViewer()
}
