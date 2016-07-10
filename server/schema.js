import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import { viewer } from 'types/ViewerType';
import node from './node';

const Schema = new GraphQLSchema({
  'query': new GraphQLObjectType({
    name: 'Query',
    fields: {
      viewer
    }
  })
});

export default Schema;
