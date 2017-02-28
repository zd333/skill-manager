'use strict';

const mongoose = require('mongoose');

const errorHandler = require('./error-handler');
const streamsCollection = require('../config/db.config').collectionNames.streams;

const Stream = require('../models/stream.model');

const db = mongoose.connection;

module.exports = app => {
  /*  '/api/v1/streams'
   *    GET: list of streams
   *    POST: create new stream
   */
  app.get('/api/v1/streams', (req, res) => {
    // TODO: check auth
    db.collection(streamsCollection).find({}, {
      _id: 0
    }).toArray((err, docs) => {
      if (err) {
        errorHandler(res, {
          non_filed_errors: ['Failed to get streams.']
        });
      } else {
        res.status(200).json(docs);
      }
    });
  });

  app.post('/api/v1/streams', (req, res) => {
    // TODO: check auth and permission
    Stream.create(req.body, (error, created) => {
      if (error) {
        errorHandler(res, error, 400);
      } else {
        res.status(200).json(created);
      }
    });
  });
};
