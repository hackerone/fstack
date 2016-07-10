import getBabelRelayPlugin from 'babel-relay-plugin';
import Schema from '~/server/schema';
import { introspectionQuery } from 'graphql/utilities';
import graphql from 'graphql';

export default graphql(Schema, introspectionQuery).then(result => {
  return getBabelRelayPlugin(result.data, {
    abortOnError: true
  });
});
