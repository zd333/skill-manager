'use strict';

const errorHandler = require('../common/error-handler');
const isAuthenticatedAndHasPermissions = require('../auth/auth-middleware');
const User = require('./user.model');

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
   * User data with latest skill marks
   */
  // TODO: implement, select latest marks
  app.get('/api/v0/users/:id');

  /**
   * User data with whole history of skill marks
   */
  // TODO: implement, order by time
  app.get('/api/v0/users/:id/history');

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
   * Add user skill value
   */
  // TODO: implement
  app.post('/api/v0/my_skill_marks');

  /**
   * Approve user skill mark
   */
  // TODO: implement
  app.post('/api/v0/users/:id/approve_skill_mark');
};
