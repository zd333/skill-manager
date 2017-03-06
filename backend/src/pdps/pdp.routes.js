'use strict';

const errorHandler = require('../common/error-handler');
const isAuthenticatedAndHasPermissions = require('../auth/auth-middleware');
const Pdp = require('./pdp.model');
const User = require('../user/user.model');

module.exports = app => {
  /**
   * List of user pdps
   */
  // TODO: implement, add `isAchieved` property to whole pdp and to each goals, add latest mark to each goal (or null)

  /**
   * Create new pdp
   * Body params:
   * `userId` (object id string, required) - id of target user
   * `plannedFinishAt` (string ISO date, required) - date when pdp is planned to bbe accomplished
   * `goals` (array of objects, required) - array of aims (knowledge levels), see below
   * `goals[i].skillId` (object id string, required) - id of skill
   * `goals[i].value` (number, required) - level of skill
   */
  app.post('/api/v0/pdps', isAuthenticatedAndHasPermissions(['pdpCreator']), (request, response) => {
    let pdpToSave = {
      creatorId: request.user.googleId,
      creatorName: request.user.name,
      postedAt: Date.now(),
      // TODO: check typeof and cast `plannedFinishAt` to date obj if it is plain string
      plannedFinishAt: request.body.plannedFinishAt
    };

    // Get target user
    return User.findOne({ googleId: request.body.userId })
      .then(foundUser => {
        if (!foundUser) {
          return Promise.reject({ message: 'Target user does not exist' });
        }
        pdpToSave.userId = foundUser.googleId;
        pdpToSave.userName = foundUser.name;
      })
      // Get goals (skills)
      // TODO: implement
      .then(() => )
      .catch(error => errorHandler(response, error, 400));
  });
};
