import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import User from 'models/user';

passport.use(new LocalStrategy(function (username, password, done) {
  return User.findOne({email: username})
    .then(resp => done(null, resp))
    .catch(err => done(err));
}));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findOne({_id: id}).then(resp => {
    done(null, resp);
  });
})

export default passport;
