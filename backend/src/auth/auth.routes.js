'use strict';

const passport = require('passport');

// const errorHandler = require('../common/error-handler');

module.exports = app => {
  /**
   * '/api/v0/login'
   * GET: Google authentication
   */
  app.get('/api/v0/login', passport.authenticate('google', { scope: ['openid email profile'] }));

  /**
   * '/api/v0/login/google/callback'
   * GET: Google authentication callback
   */
  app.get('/api/v0/google_callback',
    passport.authenticate('google', (request, response) => {
      // Authenticated successfully
      console.log('Authenticated!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', request);
      response.status(200).json({message: 'whoa'});
    }));
};
