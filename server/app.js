import graphqlHTTP from 'express-graphql';
import express from 'express';
import 'babel-polyfill';
import Schema from './schema';
import passport from 'lib/passport';


import expressSession from 'express-session';

const app = express();

app.use(expressSession({
  secret: 'tomriddle',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  console.log(req.user);
  next();
});

app.get('/login', passport.authenticate('local', {
  successRedirect: '/user'
}));

app.get('/user', function (req, res) {
  res.json({
    user: req.user
  })
})

app.use('/graphql', graphqlHTTP(req => ({
  schema: Schema,
  rootValue: {
    user_id: req.user && req.user.id,
    user: req.user
  },
  graphiql: true
})));

export default app;
