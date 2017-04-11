'use strict';

const routes = [
  require('../streams/stream.routes'),
  require('../skills/skill.routes'),
  require('../auth/auth.routes'),
  require('../user/user.routes'),
  require('../pdps/pdp.routes')
];

module.exports = app => {
  // Activate all routes
  routes.forEach(routeActivator => routeActivator(app));
};
