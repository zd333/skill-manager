'use strict';

const errorHandler = require('../common/error-handler');

module.exports = permissions => {
  return (request, response, next) => {
    // Not authenticated
    if (!request.user) {
      return errorHandler(response, { message: 'Authentication required' }, 401);
    }
    // Check user is active
    if (!request.user.isActive) {
      return errorHandler(response, { message: 'Your account is deactivated' }, 403);
    }
    // No permissions passed in (required)
    if (!permissions || !Array.isArray(permissions) || !permissions.length) {
      return next();
    }

    // The Lord has come
    if (request.user.permissions.indexOf('admin') !== -1) {
      return next();
    }

    const missingPermission = permissions
      .find(requiredPermission => request.user.permissions.indexOf(requiredPermission) === -1);
    if (missingPermission) {
      return errorHandler(response, { message: 'You do not have permission to perform this action' }, 403);
    }
    return next();
  };
};
