'use strict';

const errorHandler = require('../common/error-handler');
const isAuthenticatedAndHasPermissions = require('../auth/auth-middleware');
const Stream = require('./stream.model');

module.exports = app => {
  /**
   * List of streams
   */
  app.get('/api/v0/streams', isAuthenticatedAndHasPermissions([]), (request, response) => {
    Stream.find({}, (error, streams) => {
      if (error) {
        return errorHandler(response, error);
      }
      return response.status(200).json(streams);
    });
  });

  /**
   * Create new stream
   */
  app.post('/api/v0/streams', isAuthenticatedAndHasPermissions(['skillComposer']), (request, response) => {
    Stream.create(request.body, (error, created) => {
      if (error) {
        return errorHandler(response, error, 400);
      }
        return response.status(201).json(created);
    });
  });
};
