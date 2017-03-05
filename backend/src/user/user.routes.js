'use strict';

const errorHandler = require('../common/error-handler');
const isAuthenticatedAndHasPermissions = require('../auth/auth-middleware');
const User = require('./user.model');
const Skill = require('../skills/skill.model');
const Stream = require('../streams/stream.model');

module.exports = app => {
  /**
   * List of users
   */
  // TODO: add filter by stream id, skill id (several ids), select latest marks
  app.get('/api/v0/users', isAuthenticatedAndHasPermissions([]), (request, response) => {
    User.find({}, (error, users) => {
      if (error) {
        return errorHandler(response, error);
      }
      return response.status(200).json(users);
    });
  });

  /**
   * User data with whole history of skill marks
   */
  // TODO: implement, select latest marks
  app.get('/api/v0/users/:id');

  /**
   * Activate/deactivate user
   * Body params:
   * `isInactive` (boolean, required) - to set user is inactive flag
   */
  app.post('/api/v0/users/:id/is_inactive', isAuthenticatedAndHasPermissions(['admin']), (request, response) => {
    User.update({ googleId: request.params.id }, { $set: { isInactive: request.body.isInactive } }, (error, updated) => {
      if (error) {
        return errorHandler(response, error, 400);
      }
      if (updated.n === 0) {
        // No rows were affected, no user with given id
        return errorHandler(response, { message: 'User does not exist' }, 404);
      }
      return response.status(204).send();
    });
  });


  /**
   * Update user permissions
   */
  app.put('/api/v0/users/:id/permissions', isAuthenticatedAndHasPermissions(['admin']), (request, response, next) => {
    // Validate permissions array
    // TODO: refactor and move validation out of here
    const permissions = [
      'admin',
      'skillComposer',
      'skillApprover',
      'pdpCreator'
    ];
    const newPermissions = request.body.permissions;
    if (!Array.isArray(newPermissions)) {
      return errorHandler(response, { message: 'Incorrect permissions format' }, 400);
    }
    const sanitizedPermissions = [];
    newPermissions.forEach(newPermission => {
      const index = permissions.indexOf(newPermission);
      if (index !== -1) {
        // Found normal unique permission string
        sanitizedPermissions.push(permissions[index]);
        permissions.splice(index, 1);
      }
    });
    request.body.permissions = sanitizedPermissions;
    next();
  }, (request, response) => {
    User.update({ googleId: request.params.id }, { $set: { permissions: request.body.permissions } }, (error, updated) => {
      if (error) {
        return errorHandler(response, error, 400);
      }
      if (updated.n === 0) {
        // No rows were affected, no user with given id
        return errorHandler(response, { message: 'User does not exist' }, 404);
      }
      return response.status(204).send();
    });
  });

  /**
   * Add user skill mark to himself
   */
  app.post('/api/v0/my_skill_marks', isAuthenticatedAndHasPermissions([]), (request, response) => {
    const user = request.user;
    const skillId = request.body.skillId;
    const markValue = request.body.value;

    let skill;
    let stream;

    // Get skill
    Skill.findById(skillId)
      .then(foundSkill => {
        skill = foundSkill;
      })
      // Get related stream
      .then(() => Stream.findById(skill.streamId))
      .then(foundStream => {
        stream = foundStream;
      })
      // Check if User already has this stream and push if not
      .then(() => User.findOne({ googleId: user.googleId, 'skillStreams.streamId': stream._id }))
      .then(userWithStream => {
        if (!userWithStream) {
          // User doesn't have this stream, push it
          return User.findOneAndUpdate({ googleId: user.googleId }, {
            $push: {
              skillStreams: {
                streamId: stream._id,
                streamName: stream.name,
                skillMarks: []
              }
            }
          });
        }
        return Promise.resolve();
      })
      // Push skill mark
      .then(() => {
        return User.findOneAndUpdate({ googleId: user.googleId, 'skillStreams.streamId': stream._id }, {
          $push: {
            'skillStreams.$.skillMarks': {
              skillId: skill._id,
              skillName: skill.name,
              value: markValue,
              postedAt: Date.now()
            }
          }
        });
      })
      .then(() => response.status(201).send())
      .catch(error => errorHandler(response, error, 400));
  });

  /**
   * Approve user skill mark
   */
  // TODO: implement
  app.post('/api/v0/users/:id/approve_skill_mark');
};
