'use strict';

module.exports = permissions => {
  return (request, response, next) => {
    console.log(request.user);
    // Not authenticated
    if (!request.user) {
      return response.status(401).json({
        error: 'Authentication required'
      });
    }
    // No permissions passed (required)
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
      return response.status(403).json({
        error: 'You do not have permission to perform this action'
      });
    }
    return next();
  };
};
