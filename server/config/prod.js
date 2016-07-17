import fs from 'fs';
const assets = JSON.parse(fs.readFileSync(__dirname + '/../../build/client/assets.json', 'utf-8'));

let PREFIX = '';

if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
  PREFIX = `${process.env.OPENSHIFT_MONGODB_DB_USERNAME}:
  ${process.env.OPENSHIFT_MONGODB_DB_PASSWORD}@`;
}

const HOST = process.env.OPENSHIFT_MONGODB_DB_HOST || 'localhost';
const PORT = process.env.OPENSHIFT_MONGODB_DB_PORT || '27017';
const DB = 'propsearch';

const connectionURL = `mongodb://${PREFIX}${HOST}:${PORT}/${DB}`;
export { connectionURL };
export const cdn = '/';

export const host = process.env.OPENSHIFT_NODEJS_IP || process.env.IP;
export const port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT;

export const asset = (name) => (cdn + assets[name]);
