'use strict';

const errorHandler = require('./error-handler');
const skillCollection = require('../config/db.config').collectionNames.skills;

module.exports = (app, db) => {
  /*  '/api/v1/skills'
   *    GET: list of skills
   *    POST: create new skills
   */
  app.get('/api/v1/skills', (req, res) => {
    const searchQuery = req.query.q;
    // TODO: check auth
    db.collection(skillsCollection).find({
      name: {
        $regex: searchQuery ? searchQuery : '',
        $options: 'i'
      }
    }, {
        _id: 0
      }).toArray((err, docs) => {
        if (err) {
          errorHandler(res, {
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
      errorHandler(res, {
        name: ['This field is required.']
      }, 400);
      return;
    }
    // TODO: check unique

    db.collection(skillsCollection).insertOne({
      name: req.body.name
    }, (err, doc) => {
      if (err) {
        errorHandler(res, {
          'non_filed_errors': ['Failed to create new skill.']
        });
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  });
}
