'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');

const app = express();
app.use(bodyParser.json());

const ObjectID = mongodb.ObjectID;
let db;
const usersCollection = 'users';
const streamsCollection = 'streams';
const skillsCollection = 'skills';

// db connection
// TODO: move db connection URI to conf
mongodb.MongoClient.connect('mongodb://mongo:27017/skdsmdb', (err, database) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log('Database connection ready');

  // Server init
  // TODO: move server port to conf
  const server = app.listen(3042, () => {
    console.log(`SKD SM server now running on port ${server.address().port}`);
  });
});

// Generic error handler used by all endpoints
function handleError(res, errorObj, code) {
  console.log('API ERROR: ' + errorObj);
  res.status(code || 500).json({'error': errorObj});
}

// Routes

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
      handleError(res, {
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
    handleError(res, {
      name: ['This field is required.']
    }, 400);
    return;
  }
  // TODO: check unique

  db.collection(streamsCollection).insertOne({
    name: req.body.name
  }, (err, doc) => {
    if (err) {
      handleError(res, {
        'non_filed_errors': ['Failed to create new stream.']
      });
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

/*  '/api/v1/skills'
 *    GET: list of skills
 *    POST: create new skills
 */
app.get('/api/v1/skills', (req, res) => {
  // TODO: implement search query
  const searchQuery = req.query.q;
  // TODO: check auth
  db.collection(skillsCollection).find({
    name: {
      $regex : searchQuery ? searchQuery : '',
      $options: 'i'
    }
  }, {
    _id: 0
  }).toArray((err, docs) => {
    if (err) {
      handleError(res, {
        'non_filed_errors': ['Failed to get skills.']
      });
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post('/api/v1/skills', (req, res) => {
  // TODO: check auth and permission
  if (!req.body.name) {
    handleError(res, {
      name: ['This field is required.']
    }, 400);
    return;
  }
  // TODO: check unique

  db.collection(skillsCollection).insertOne({
    name: req.body.name
  }, (err, doc) => {
    if (err) {
      handleError(res, {
        'non_filed_errors': ['Failed to create new skill.']
      });
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});
