'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const passport = require('passport');

const dbConfig = require('./config/db.config');
const routes = require('./routes');
const passportConfig = require('./config/passport.config');

const app = express();
app.use(bodyParser.json());

// Shared DB connection instance
let db;

mongodb.MongoClient.connect(dbConfig.uri, (err, database) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  db = database;
  passportConfig(passport, db);


  // Server init
  // TODO: define port via env var
  const server = app.listen(3042, () => {
    console.log(`SKD SM server now running on port ${server.address().port}`);
    // Activate routes
    routes(app, db);
  });
});

