import graphqlHTTP from 'express-graphql';
import express from 'express';
import 'babel-polyfill';
import Schema from './schema';
import expressSession from 'express-session';
import fs from 'fs';
import {asset, host, ip} from '~/config/config';

const app = express();
app.use(expressSession({
  secret: 'tomriddle',
  resave: true,
  saveUninitialized: true,
}));

app.use('/graphql', graphqlHTTP(req => ({
  schema: Schema,
  rootValue: {
    user_id: req.user && req.user.id,
    user: req.user,
  },
  graphiql: true,
})));

const indexView = fs.readFileSync(`${__dirname}/views/index.html`, 'utf8')
  .replace('[main.js]', `${cdn}app.js`)
  .replace('[main.css]', `${cdn}app.css`);

app.get('/', (req, res) => {
  res.send(indexView);
});

app.start = () => {
  app.listen(host, ip, () => {
    console.log(`The server is running at http://${host}:${port}`);
  });
};

export default app;
