'use strict';

const requestMaker = require('request-promise-native');

const config = require('../config/app.config');
const errorHandler = require('../common/error-handler');
const User = require('../user/user.model');

module.exports = app => {
  /**
   * Google authentication
   */
  app.post('/api/v0/login/google', (request, response) => {
    const params = {
      code: request.body.code,
      client_id: request.body.clientId,
      client_secret: config.auth.google.clientSecret,
      redirect_uri: request.body.redirectUri,
      grant_type: 'authorization_code'
    };

    // Step 1, Exchange authorization code for access token
    requestMaker.post(config.auth.google.accessTokenUrl, { json: true, form: params })
      // Step 2, Use the access token to get the user's data
      .then(responseToken => requestMaker.get({
        url: config.auth.google.peopleApiUrl,
        json: true,
        headers: { Authorization: 'Bearer ' + responseToken.access_token }
      }))
      .then(responseUserData => {
        // Check gmail account domain
        if (responseUserData.hd !== config.auth.google.allowedDomain) {
          return errorHandler(response, { message: `Only ${config.auth.google.allowedDomain} accounts are allowed` }, 403);
        }
        // TODO: final step should generate JWT, add it to user object and send to client, implement this

        // Select user from db by email
        User.findOne({ email: responseUserData.email })
          .then(foundUser => {
            // Check if user exists
            if (foundUser) {
              // Check user is active
              if (!foundUser.isActive) {
                return errorHandler(response, { message: 'Your account is disabled' }, 403);
              }
              request.session.user = foundUser;
              return response.status(200).json(foundUser);
            }
            // This is new user, save him
            return User.create({
              name: responseUserData.name,
              email: responseUserData.email
            })
              .then(createdUser => {
                request.session.user = createdUser;
                return response.status(200).json(createdUser);
              });
          })
          .catch(error => errorHandler(response, error));
      });
  });

  /**
   * Get user session data
   */
  app.get('/api/v0/user_session', (request, response) => {
    if (request.session && request.session.user) {
      return response.status(200).json(request.session.user);
    }
    return errorHandler(response, { message: 'You are not logged in' }, 404);
  });

  /**
   * Logout user
   */
  app.post('/api/v0/logout', (request, response) => {
    request.session.destroy();
    return response.status(200).json({ message: 'Successfully logged out' });
  });
};
