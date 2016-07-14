

const HOST = process.env.OPENSHIFT_MONGODB_DB_HOST;
const PORT = process.env.OPENSHIFT_MONGODB_DB_PORT;
const DB = 'propsearch';

const HOST_DEV = 'localhost';
const PORT_DEV = '27017';
const DB_DEV = 'prop';

let connectionURL = `mongodb://${HOST_DEV}:${PORT_DEV}/${DB_DEV}`;
if (process.env.NODE_ENV === 'production') {
  connectionURL = `mongodb://${HOST}:${PORT}/${DB}`;
}
export { connectionURL };
