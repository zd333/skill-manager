'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoSessionStore = require('connect-mongo')(session);

const config = require('./config/app.config');
const activateRoutes = require('./common/routes-collector');

mongoose.Promise = Promise;
const app = express();
app.use(bodyParser.json());

mongoose.connect(config.db.uri, error => {
  if (error) {
    console.log('ERROR connecting to: ' + config.db.uri + '. ' + error);
    return;
  }

  app.use(session({
    secret: 'supersecret',
    resave: false,
    saveUninitialized: false,
    store: new MongoSessionStore({ mongooseConnection: mongoose.connection })
  }));

  const server = app.listen(config.server.port, () => {
    console.log(`SKD SM server now running on port ${server.address().port}`);
    activateRoutes(app);
  });
});
