import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import serverConfig from '../config/constants';
import User from '../models/user';

// expose this function to our app using module.exports
module.exports = function (passport) {
  // used to serialize the user for the session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = serverConfig.secret;
  opts.issuer = serverConfig.jwt.issuer;
  opts.audience = serverConfig.jwt.audience;

  passport.use(new JWTStrategy(opts, (jwtPayload, done) => {
    User.findOne({ email: jwtPayload.email }, (err, user) => {
      if (err) {
        return done(err, false);
      }

      if (user) {
        return done(null, user);
      }
      return done(null, false);
    });
  }));
};
