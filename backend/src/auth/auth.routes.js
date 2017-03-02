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
  app.get('/api/v0/login/google/callback', (request, response) => {
    passport.authenticate('google', (error, user) => {
      if (error) {
        return errorHandler(response, error, 403);
      }
      if (!user) {
        return errorHandler(response, { message: 'Please authenticate' }, 401);
      }
      request.logIn(user, error => {
        if (error) {
          return errorHandler(response, error);
        }
        return response.status(200).json(request.user);
      });
    })(request, response);
  });
  /**
   * Get user session data
   */
  app.get('/api/v0/user_session', (request, response) => {
    if (request.user) {
      return response.status(200).json(request.user);
    }
    return errorHandler(response, { message: 'You are not logged in' }, 404);
  });

  /**
   * Logout user
   */
  app.post('/api/v0/logout', (request, response) => {
    request.session.destroy(() => {
      request.logout();
    });
    return response.status(200).json({ message: 'Successfully logged out' });
  });
};
