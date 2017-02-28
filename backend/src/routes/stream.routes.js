'use strict';

const errorHandler = require('./error-handler');
const streamsCollection = require('../config/db.config').collectionNames.streams;

module.exports = (app, db) => {
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
          'non_filed_errors': ['Failed to get streams.']
        });
      } else {
        res.status(200).json(docs);
      }
    });
  });

  app.post('/api/v1/streams', (req, res) => {
    // TODO: check auth and permission
    if (!req.body.name) {
      errorHandler(res, {
        name: ['This field is required.']
      }, 400);
      return;
    }
    // TODO: check unique

    db.collection(streamsCollection).insertOne({
      name: req.body.name
    }, (err, doc) => {
      if (err) {
        errorHandler(res, {
          'non_filed_errors': ['Failed to create new stream.']
        });
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  });
}
