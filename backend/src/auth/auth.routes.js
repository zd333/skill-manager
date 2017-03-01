'use strict';

const passport = require('passport');

// const errorHandler = require('../common/error-handler');

module.exports = app => {
  /**
   * '/api/v0/login/google'
   * POST: Google authentication
   */
  // TODO: replace get with post after SPA is ready
  app.get('/api/v0/login/google', passport.authenticate('google', { scope: ['email profile'] }));

  /**
   * '/api/v0/login/google/callback'
   * GET: Google authentication callback
   */
  // TODO: refactor to work with SPA
  app.get('/api/v0/login/google/callback', passport.authenticate('google', { failureRedirect: '/callback_error' }), (request, response) => {
    response.redirect('/logged_in');
  });

  // TODO: remove this stub after SPA auth flow is implemented
  app.get('/logged_in', (request, response) => {
    response.status(200).json({whoa: 'whoa!!!'});
  });
};
