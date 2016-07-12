import graphqlHTTP from 'express-graphql';
import express from 'express';
import 'babel-polyfill';
import Schema from './schema';
import expressSession from 'express-session';
import fs from 'fs';
import path from 'path';

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

export default app;
