'use strict';

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const config = require('../config/app.config');
const User = require('../user/user.model');

module.exports = app => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (error, user) => {
      done(error, user);
    });
  });

  passport.use(new GoogleStrategy(config.auth.google, (token, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id }, (error, user) => {
      if (error) {
        return done(error);
      }
      if (user) {
        return done(null, user);
      }
      User.create({
        googleId: profile.id,
        token,
        name: profile.displayName,
        email: profile.emails[0].value
      }, (error, created) => {
        if (error) {
          return done(error);
        }
        return done(null, created);
      });
    });
  }));

  app.use(passport.initialize());
  app.use(passport.session());
};
