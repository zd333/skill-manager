const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');

const app = express();
app.use(bodyParser.json());

const ObjectID = mongodb.ObjectID;
const db;
const usersCollection = "users";

// TODO: move db connection URI to conf
mongodb.MongoClient.connect('mongodb://mongo:27017', (err, database) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  // TODO: move server port to conf
  const server = app.listen(3042, () => {
    console.log(`SKD SM server now running on port ${server.address().port}`);
  });
});

app.get('/', function (req, res) {
  res.send("SKD SM will be here soon");
});

