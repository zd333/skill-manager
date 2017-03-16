'use strict';

const mongoose = require('mongoose');

const errorHandler = require('../common/error-handler');
const isAuthenticatedAndHasPermissions = require('../auth/auth-middleware');

const User = require('./user.model');
const Skill = require('../skills/skill.model');
const Stream = require('../streams/stream.model');

module.exports = app => {
  /**
   * List of users with latest marks
   * Query params:
   * `include_inactive` (no value, optional) - if select or not inactive users
   * `streams` (string, optional) - separated by comma stream ids to filter by
   * `skills` (string, optional) - separated by comma skill ids to filter by
   */
  // ATTENTION: with this implementation users without skill marks will not be included to response
  app.get('/api/v0/users', isAuthenticatedAndHasPermissions([]), (request, response) => {
    // Prepare filters
    const matchFilter = { $and: [] };
    // `isActive` filter
    if (Object.hasOwnProperty.call(request.query, 'include_inactive')) {
      matchFilter.$and.push({});
    } else {
      matchFilter.$and.push({ isActive: true });
    }
    // `streamId` filter
    if (request.query.streams) {
      request.query.streams.split(',')
        .filter(stringId => mongoose.Types.ObjectId.isValid(stringId))
        .forEach(stringId => matchFilter.$and.push({ 'skillMarks.streamId': new mongoose.Types.ObjectId(stringId) }));
    }
    // `skillId` filter
    if (request.query.skills) {
      request.query.skills.split(',')
        .filter(stringId => mongoose.Types.ObjectId.isValid(stringId))
        .forEach(stringId => matchFilter.$and.push({ 'skillMarks.skillId': new mongoose.Types.ObjectId(stringId) }));
    }
    // Do crazy projection
    return User.aggregate([
      // Apply filters
      { $match: matchFilter },
      // Flatten users (decompose nested arrays)
      { $unwind: '$skillMarks' },
      // Sort users, this will make latest (by `postedAt`) be first in each `_id`+`skillId` group (see next grouping statement)
      {
        $sort: {
          _id: -1,
          'skillMarks.skillId': -1,
          'skillMarks.postedAt': -1
        }
      },
      // Group users by skill
      {
        $group: {
          _id: {
            _id: '$_id',
            skillId: '$skillMarks.skillId'
          },
          name: { $first: '$name' },
          email: { $first: '$email' },
          isActive: { $first: '$isActive' },
          skillMarkId: { $first: '$skillMarks._id' },
          postedAt: { $first: '$skillMarks.postedAt' },
          value: { $first: '$skillMarks.value' },
          skillName: { $first: '$skillMarks.skillName' },
          skillId: { $first: '$skillMarks.skillId' },
          streamName: { $first: '$skillMarks.streamName' },
          streamId: { $first: '$skillMarks.streamId' },
          approvement: { $first: '$skillMarks.approvement' }
        }
      },
      // Re-group users to get required data structure
      {
        $group: {
          _id: '$_id._id',
          name: { $first: '$name' },
          email: { $first: '$email' },
          isActive: { $first: '$isActive' },
          skillMarks: {
            $push: {
              _id: '$skillMarkId',
              streamId: '$streamId',
              streamName: '$streamName',
              skillId: '$skillId',
              skillName: '$skillName',
              value: '$value',
              postedAt: '$postedAt',
              approvement: '$approvement'
            }
          }
        }
      }
    ])
      .then(users => response.status(200).json(users))
      .catch(error => errorHandler(response, error));
  });

  /**
   * User data with whole history of skill marks
   */
  app.get('/api/v0/users/:id', isAuthenticatedAndHasPermissions([]), (request, response) => {
    return User.findById(request.params.id, { _id: 0 })
      .then(foundUser => {
        if (!foundUser) {
          return errorHandler(response, { message: 'User does not exist' }, 404);
        }
        return response.status(200).json(foundUser);
      })
      .catch(error => errorHandler(response, error));
  });

  /**
   * Activate/deactivate user
   * Body params:
   * `isActive` (boolean, required) - to set user is inactive flag
   */
  app.post('/api/v0/users/:id/is_active', isAuthenticatedAndHasPermissions(['admin']), (request, response) => {
    return User.update({ _id: request.params.id }, { $set: { isActive: request.body.isActive } })
      .then(updatedUsers => {
        if (updatedUsers.n === 0) {
          // No rows were affected, no user with given id
          return errorHandler(response, { message: 'User does not exist' }, 404);
        }
        return response.status(204).send();
      })
      .catch(error => errorHandler(response, error, 400));
  });

  /**
   * Update user permissions
   * Body params:
   * `permissions` (array, required) - new list of user permission strings
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
    return User.update({ _id: request.params.id }, { $set: { permissions: request.body.permissions } })
      .then(updatedUsers => {
        if (updatedUsers.n === 0) {
          // No rows were affected, no user with given id
          return errorHandler(response, { message: 'User does not exist' }, 404);
        }
        return response.status(204).send();
      })
      .catch(error => errorHandler(response, error, 400));
  });

  /**
   * Add user skill mark to himself
   * Body params:
   * `skillId` (object id, required) - skill id
   * `value` (number, required) - mark value
   */
  app.post('/api/v0/my_skill_marks', isAuthenticatedAndHasPermissions([]), (request, response) => {
    const user = request.user;
    const skillId = request.body.skillId;
    const markValue = request.body.value;

    let skill;
    let stream;

    // Get skill
    return Skill.findById(skillId)
      .then(foundSkill => {
        skill = foundSkill;
      })
      // Get related stream
      .then(() => Stream.findById(skill.streamId))
      .then(foundStream => {
        stream = foundStream;
      })
      // Push skill mark
      .then(() => {
        return User.findOneAndUpdate({ _id: user._id }, {
          $push: {
            skillMarks: {
              streamId: stream._id,
              streamName: stream.name,
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
  app.post('/api/v0/user_skill_marks/:id/approve', isAuthenticatedAndHasPermissions(['skillApprover']), (request, response) => {
    return User.findOneAndUpdate({ 'skillMarks._id': request.params.id }, {
      $set: {
        'skillMarks.$.approvement': {
          approverId: request.user._id,
          approverName: request.user.name,
          postedAt: Date.now()
        }
      }
    })
      .then(() => response.status(201).send())
      .catch(error => errorHandler(response, error, 400));
  });
};
