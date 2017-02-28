'use strict';

const routes = [
  require('./stream.routes'),
  require('./skill.routes')
];

module.exports = app => {
  // Activate all routes
  routes.forEach(route => route(app));
};
