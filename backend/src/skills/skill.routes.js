'use strict';

const errorHandler = require('../common/error-handler');
const Skill = require('./skill.model');

module.exports = app => {
  /**
   * '/api/v0/skills'
   * GET: list of skills
   * POST: create new skills
   */
  app.get('/api/v0/skills', (request, response) => {
    const searchQuery = request.query.q;
    // TODO: check auth
    Skill.find({
      name: {
        $regex: searchQuery ? searchQuery : '',
        $options: 'i'
      }
    }, (error, skills) => {
      if (error) {
        errorHandler(response, error);
      } else {
        response.status(200).json(skills);
      }
    });
  });

  app.post('/api/v0/skills', (request, response) => {
    // TODO: check auth and permission
    Skill.create(request.body, (error, created) => {
      if (error) {
        errorHandler(response, error, 400);
      } else {
        response.status(201).json(created);
      }
    });
  });
};
