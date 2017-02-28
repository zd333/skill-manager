'use strict';

const routes = [
  require('../streams/stream.routes'),
  require('../skills/skill.routes'),
  require('../auth/auth.routes')
];

module.exports = app => {
  // Activate all routes
  routes.forEach(routeActivator => routeActivator(app));
};
