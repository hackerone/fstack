import { fromGlobalId } from 'graphql-relay';

const types = {};
const resolvers = {};

export const registerType = (type, resolver) => {
  types[type.name] = type;
  resolvers[type.name] = resolver;
  return type;
};

export const idFetcher = (globalId, info) => {
  const { type, id } = fromGlobalId(globalId);
  if(resolvers[type]) {
    return resolvers[type].apply(resolvers[type], id);
  }
}

export const typeResolver = (obj) => {
  return types[obj.type];
}
