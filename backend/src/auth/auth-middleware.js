'use strict';

module.exports = permissions => {
  return (request, response, next) => {
    if (!request.user) {
      return response.status(401).json({
        error: 'Authentication required'
      });
    }
    if (!permissions || !Array.isArray(permissions) || !permissions.length) {
      return next();
    }
    const missingPermission = permissions.find(requiredPermission => {
      const foundIndex = request.user.permissions
        .findIndex(userPermission => userPermission === requiredPermission);
      return foundIndex === -1;
    });
    if (missingPermission) {
      return response.status(403).json({
        error: 'You do not have permission to perform this action'
      });
    }
    return next();
  };
};
