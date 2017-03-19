'use strict';

module.exports = (response, error, code) => {
  console.log('API ERROR: ' + JSON.stringify(error));
  response.status(code || 500).json(error);
};
