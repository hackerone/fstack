import fs from 'fs';
import { graphql } from 'graphql';
import { introspectionQuery, printSchema } from 'graphql/utilities';
import path from 'path';
import request from 'sync-request';

const url = 'http://localhost:9000/graphql';

(function() {
  var response = request('POST', url, {
     qs: {
        query: introspectionQuery
     }
  });

  const schema = JSON.parse(response.body.toString('utf-8'));

  fs.writeFileSync(
    path.join(__dirname, '../src/data/schema.json'),
    JSON.stringify(schema, null, 2)
  );

}());
