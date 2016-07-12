import getBabelRelayPlugin from 'babel-relay-plugin';
import fs from 'fs';
import path from 'path';

const data = fs.readFileSync(path.join(__dirname, 'schema.json'), 'utf-8');
const schema = JSON.parse(data);

export default getBabelRelayPlugin(schema.data);
