'use strict';

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const config = require('../config/app.config');
const User = require('../user/user.model');

module.exports = app => {
  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) => {
    User.findById(id, (error, user) => done(error, user));
  });

  passport.use(new GoogleStrategy(config.auth.google.credentials, (token, refreshToken, profile, done) => {
    // Check gmail account domain
    if (profile._json.domain !== config.auth.google.allowedDomain) {
      return done({ message: `Only ${config.auth.google.allowedDomain} accounts are allowed` });
    }

    // Select user from db
    User.findOne({ googleId: profile.id }, (error, user) => {
      if (error) {
        return done(error);
      }
      // User exists
      if (user) {
        return done(null, user);
      }
      // Check user is active
      if (!user.isActive) {
        return done({ message: 'Your account is disabled' });
      }
      // This is new user
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
