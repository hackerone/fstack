import { fromGlobalId } from 'graphql-relay';

const types = {};
const resolvers = {};

export const registerType = (type, resolver) => {
  types[type.name] = type;
  resolvers[type.name] = resolver;
  return type;
};

export const idFetcher = (globalId) => {
  const { type, id } = fromGlobalId(globalId);
  let output = null;
  if (resolvers[type]) {
    const result = resolvers[type].apply(null, [id]);
    if (typeof result === 'function') {
      output = result.then(resp => Object.assign({}, resp, { type }));
    } else {
      output = Object.assign({}, result, { type });
    }
  }
  return output;
};

export const typeResolver = (obj) => types[obj.type];
