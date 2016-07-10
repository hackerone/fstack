import { nodeDefinitions } from 'graphql-relay';
import { idFetcher, typeResolver } from 'lib/registry';

export const { nodeInterface, nodeField } = nodeDefinitions(
  idFetcher, typeResolver
);
