import fs from 'fs';
import { graphql } from 'graphql';
import { introspectionQuery, printSchema } from 'graphql/utilities';
import path from 'path';
import schema from 'server/schema';

graphql(schema, introspectionQuery)
  .then(result => {
    fs.writeFileSync(
      path.join(__dirname, 'schema.json'),
      JSON.stringify(result, null, 2)
    );
    process.exit();
  })
  .catch(err => {
    console.log(err);
    process.exit();
  });
