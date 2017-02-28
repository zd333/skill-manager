'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const dbConfig = require('./config/db.config');
const routes = require('./routes');
const passportConfig = require('./config/passport.config');

const app = express();
app.use(bodyParser.json());

mongoose.connect(dbConfig.uri, err => {
  if (err) {
    console.log('ERROR connecting to: ' + dbConfig.uri + '. ' + err);
  } else {
    console.log('Succeeded connected to: ' + dbConfig.uri);
  }
});

// Init server
// TODO: define port via env var
const server = app.listen(3042, () => {
  console.log(`SKD SM server now running on port ${server.address().port}`);

  // Config Google auth
  passportConfig(passport);

  // Activate routes
  routes(app);
});

