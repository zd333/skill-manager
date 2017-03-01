'use strict';

const errorHandler = require('../common/error-handler');
const hasPermissions = require('../auth/auth-middleware');
const Skill = require('./skill.model');

module.exports = app => {
  /**
   * '/api/v0/skills'
   * GET: list of skills with optionsl `q` param
   * POST: create new skill
   */

  app.get('/api/v0/skills', hasPermissions([]), (request, response) => {
    const searchQuery = request.query.q;
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

  app.post('/api/v0/skills', hasPermissions(['skillComposer']), (request, response) => {
    Skill.create(request.body, (error, created) => {
      if (error) {
        errorHandler(response, error, 400);
      } else {
        response.status(201).json(created);
      }
    });
  });
};
