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

export const PropertyType = new GraphQLObjectType({
  name: 'Property',
  interfaces: [node.interface],
  fields: () => ({
    id: globalIdField('Property'),
    name: {type: GraphQLString},

  })
});

export const getProperty = (id: ?number) => {
  return {
    id: 1,
    name: 'Ganesh'
  }
};

export const Property = {
  type: PropertyType,
  interfaces: [node.interface],
  resolve: () => getProperty()
}
