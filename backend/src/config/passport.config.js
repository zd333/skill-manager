'use strict';

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const authConfig = require('./auth.config');

module.exports = (passport, db) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    // TODO: get from db and pass to done
    done(null, {});
  });

  passport.use(new GoogleStrategy({
    clientID: authConfig.clientID,
    clientSecret: authConfig.clientSecret,
    callbackURL: authConfig.callbackURL
  }, (token, refreshToken, profile, done) => {
    // TODO: this async looks like bool shit, clarify and refactor
    // Make the code asynchronous
    process.nextTick(() => {
      console.log(profile);
    });
  }));
};
