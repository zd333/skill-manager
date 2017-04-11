'use strict';

const errorHandler = require('../common/error-handler');
const isAuthenticatedAndHasPermissions = require('../auth/auth-middleware');

const Skill = require('./skill.model');
const Stream = require('../streams/stream.model');

module.exports = app => {
  /**
   * List of skills
   * Query params:
   * `q` (string, optional) - search string
   */
  app.get('/api/v0/skills', isAuthenticatedAndHasPermissions([]), (request, response) => {
    const searchQuery = request.query.q;
    return Skill.find({
      name: {
        $regex: searchQuery ? searchQuery : '',
        $options: 'i'
      }
    })
      .then(foundSkills => response.status(200).json(foundSkills))
      .catch(error => errorHandler(response, error));
  });

  /**
   * Create new skill
   * Body params:
   * `name` (string, required) - name of new skill
   * `streamId` (object id string, required) - id of related stream
   */
  app.post('/api/v0/skills', isAuthenticatedAndHasPermissions(['skillComposer']), (request, response) => {
    return Stream.findById(request.body.streamId)
      .then(foundStream => Skill.create(Object.assign({ streamName: foundStream.name }, request.body)))
      .then(createdSkill => response.status(201).json(createdSkill))
      .catch(error => errorHandler(response, error, 400));
  });
};
