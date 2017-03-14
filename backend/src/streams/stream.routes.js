'use strict';

const errorHandler = require('../common/error-handler');
const isAuthenticatedAndHasPermissions = require('../auth/auth-middleware');

const Stream = require('./stream.model');

module.exports = app => {
  /**
   * List of streams
   */
  app.get('/api/v0/streams', isAuthenticatedAndHasPermissions([]), (request, response) => {
    return Stream.find({})
      .then(foundStreams => response.status(200).json(foundStreams))
      .catch(error => errorHandler(response, error));
  });

  /**
   * Create new stream
   * Body params:
   * `name` (string, required) - name of new stream
   */
  app.post('/api/v0/streams', isAuthenticatedAndHasPermissions(['skillComposer']), (request, response) => {
    return Stream.create(request.body)
      .then(createdStream => response.status(201).json(createdStream))
      .catch(error => errorHandler(response, error, 400));
  });
};
