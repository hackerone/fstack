import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} from 'graphql';
import {
  globalIdField,
} from 'graphql-relay';
import { nodeInterface } from '../node';
import Property from 'models/Property';
import { registerType } from 'lib/registry';

const PropertyType = new GraphQLObjectType({
  name: 'Property',
  interfaces: [nodeInterface],
  fields: () => ({
    id: globalIdField('Property'),
    title: { type: GraphQLString },
    rightmoveId: { type: GraphQLString },
    summary: { type: GraphQLString },
    description: { type: GraphQLString },
    type: { type: GraphQLString },
    price: { type: GraphQLInt },
    feesApply: { type: GraphQLString },
    distance: { type: GraphQLString },
    images: {
      type: new GraphQLList(GraphQLString),
    },
    availableDate: { type: GraphQLString },
    propertyUrl: { type: GraphQLString },
    create_date: { type: GraphQLString },
  })
});

export const getProperty = (id) => {
  return Property.findOne({
    _id: id
  });
};

export default registerType(PropertyType, getProperty);
