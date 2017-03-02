'use strict';

const passport = require('passport');

const config = require('../config/app.config');
const errorHandler = require('../common/error-handler');

module.exports = app => {
  /**
   * Google authentication
   */
  // TODO: replace get with post after SPA is ready
  app.get('/api/v0/login/google', (request, response, next) => {
    passport.authenticate('google', {
      scope: ['email profile'],
      hd: config.auth.google.allowedDomain,
      prompt: 'select_account'
    }, error => {
      if (error) {
        return errorHandler(response, error, 403);
      }
      return next();
    })(request, response, next);
  });

  /**
   * Google authentication callback
   */
  app.get('/api/v0/login/google/callback', (request, response, next) => {
    passport.authenticate('google', error => {
      if (error) {
        return errorHandler(response, error, 403);
      }
      return next();
    })(request, response, next);
  }, (request, response) => response.status(200).json({ message: 'Successfully logged in' }));
};
