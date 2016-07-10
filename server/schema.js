import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import { ViewerQuery } from 'types/ViewerType';
import { nodeField } from './node';

const Schema = new GraphQLSchema({
  'query': new GraphQLObjectType({
    name: 'Query',
    fields: {
      viewer: ViewerQuery,
      node: nodeField
    }
  })
});

export default Schema;
