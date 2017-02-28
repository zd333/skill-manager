'use strict';

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const config = require('../config/app.config');

module.exports = app => {
  passport.serializeUser((user, done) => {
    console.log('************user', user);
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    // TODO: get from db and pass to done
    console.log('*********user id', id);
    done(null, {});
  });

  passport.use(new GoogleStrategy(config.auth.google, (token, refreshToken, profile, done) => {
    console.log('********token', token);
    console.log('********refreshToken', refreshToken);
    console.log('********profile', profile);
    done({}, profile);
  }));

  app.use(passport.initialize());
  app.use(passport.session());
};
