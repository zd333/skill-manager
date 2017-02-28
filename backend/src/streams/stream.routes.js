'use strict';

const errorHandler = require('../common/error-handler');
const Stream = require('./stream.model');

module.exports = app => {
  /**
   * '/api/v0/streams'
   * GET: list of streams
   * POST: create new stream
   */
  app.get('/api/v0/streams', (request, response) => {
    // TODO: check auth
    Stream.find({}, (error, streams) => {
      if (error) {
        errorHandler(response, error);
      } else {
        response.status(200).json(streams);
      }
    });
  });

  app.post('/api/v0/streams', (request, response) => {
    // TODO: check auth and permission
    Stream.create(request.body, (error, created) => {
      if (error) {
        errorHandler(response, error, 400);
      } else {
        response.status(201).json(created);
      }
    });
  });
};
