let PREFIX = '';

if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
  PREFIX = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ':' +
  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + '@';
}

const HOST = process.env.OPENSHIFT_MONGODB_DB_HOST || 'localhost';
const PORT = process.env.OPENSHIFT_MONGODB_DB_PORT || '27017';
const DB = 'propsearch';

const connectionURL = `mongodb://${PREFIX}${HOST}:${PORT}/${DB}`;
export { connectionURL };
