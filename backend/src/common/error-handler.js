'use strict';

module.exports = (response, error, code) => {
  console.log('API ERROR: ' + JSON.stringify(error));
  return response.status(code || 500).json(error);
};
