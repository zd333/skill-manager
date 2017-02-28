'use strict';

const routes = [
  require('../streams/stream.routes'),
  require('../skills/skill.routes')
];

module.exports = app => {
  // Activate all routes
  routes.forEach(routeActivator => routeActivator(app));
};
