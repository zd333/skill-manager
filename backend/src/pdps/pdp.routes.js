'use strict';

const moment = require('moment');

const errorHandler = require('../common/error-handler');
const isAuthenticatedAndHasPermissions = require('../auth/auth-middleware');

const Pdp = require('./pdp.model');
const User = require('../user/user.model');
const Skill = require('../skills/skill.model');

module.exports = app => {
  /**
   * List of user pdps
   */
  app.get('/api/v0/pdps/user/:id', isAuthenticatedAndHasPermissions([]), (request, response) => {
    let pdps;
    return Pdp.find({ userId: request.params.id })
      .then(foundPdps => {
        pdps = foundPdps;
      })
      // Read user details to verify goals with existing skill marks
      // TODO: refactor this - avoid every time on-the-fly calculation of if each goal and whole pdp are achieved
      .then(() => User.findById(request.params.id))
      .then(foundUser => {
        const user = foundUser.toObject();
        pdps = pdps.map(pdp => {
          let pdpAchieved = true;
          const pdpObject = pdp.toObject();
          pdpObject.goals.forEach(goal => {
            const goalMetMarkIndex = user.skillMarks
              .findIndex(skillMark => skillMark.skillId.toString() === goal.skillId.toString() && skillMark.value >= goal.value);
            goal.isAchieved = goalMetMarkIndex !== -1;
            pdpAchieved = pdpAchieved && goal.isAchieved;
          });
          return Object.assign({ isAchieved: pdpAchieved }, pdpObject);
        });
        return response.status(200).json(pdps);
      })
      .catch(error => errorHandler(response, error));
  });

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
    // TODO: move validation out of here
    // Validate finish date
    const plannedFinishAt = moment(request.body.plannedFinishAt, moment.ISO_8601);
    if (!plannedFinishAt.isValid()) {
      return errorHandler(response, { message: 'Finish date is missing or not ISO date string' }, 400);
    }
    // Validate goals
    if (!Array.isArray(request.body.goals) || !request.body.goals.length) {
      return errorHandler(response, { message: 'Invalid goals' }, 400);
    }

    const pdpToSave = {
      creatorId: request.session.user._id,
      creatorName: request.session.user.name,
      postedAt: Date.now(),
      plannedFinishAt: plannedFinishAt.toDate()
    };

    // Get target user
    return User.findById(request.body.userId)
      .then(foundUser => {
        if (!foundUser) {
          return Promise.reject({ message: 'Target user is missing or does not exist' });
        }
        pdpToSave.userId = foundUser._id;
        pdpToSave.userName = foundUser.name;
      })
      // Get goals (skills)
      .then(() => Skill.find({ _id: { $in: request.body.goals.map(goal => goal.skillId) } }))
      .then(foundSkills => {
        if (foundSkills.length !== request.body.goals.length) {
          return errorHandler(response, { message: 'Some posted goals are invalid' }, 400);
        }
        pdpToSave.goals = foundSkills.map((skill, i) => ({
          streamId: skill.streamId,
          streamName: skill.streamName,
          skillId: skill._id,
          skillName: skill.name,
          value: request.body.goals[i].value
        }));
      })
      .then(() => Pdp.create(pdpToSave))
      .then(() => response.status(201).send())
      .catch(error => errorHandler(response, error, 400));
  });
};
