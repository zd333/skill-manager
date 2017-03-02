'use strict';

const errorHandler = require('../common/error-handler');
const isAuthenticatedAndHasPermissions = require('../auth/auth-middleware');
const Skill = require('./skill.model');

module.exports = app => {
  /**
   * List of skills with optional `q` param
   */
  app.get('/api/v0/skills', isAuthenticatedAndHasPermissions([]), (request, response) => {
    const searchQuery = request.query.q;
    Skill.find({
      name: {
        $regex: searchQuery ? searchQuery : '',
        $options: 'i'
      }
    }, (error, skills) => {
      if (error) {
        return errorHandler(response, error);
      }
      return response.status(200).json(skills);
    });
  });

  /**
   * Create new skill
   */
  app.post('/api/v0/skills', isAuthenticatedAndHasPermissions(['skillComposer']), (request, response) => {
    Skill.create(request.body, (error, created) => {
      if (error) {
        return errorHandler(response, error, 400);
      }
      return response.status(201).json(created);
    });
  });
};
