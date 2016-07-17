const HOST = 'localhost';
const PORT = '27017';
const DB = 'propsearch';

const connectionURL = `mongodb://${HOST}:${PORT}/${DB}`;
export { connectionURL };
export const cdn = '/client/';

export const host = '127.0.0.1';
export const port = 9000;

export const asset = (name) => (cdn + name);
