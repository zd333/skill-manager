'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const passport = require('passport');

const config = require('./config/app.config');
const routes = require('./routes');

const app = express();
app.use(bodyParser.json());

mongoose.connect(config.db.uri, error => {
  if (error) {
    console.log('ERROR connecting to: ' + config.db.uri + '. ' + error);
  } else {
    console.log('Succeeded connected to: ' + config.db.uri);
  }
});

// Init server
const server = app.listen(config.server.port, () => {
  console.log(`SKD SM server now running on port ${server.address().port}`);
  // Activate routes
  routes(app);
});

