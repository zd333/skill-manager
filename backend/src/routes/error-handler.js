'use strict';

module.exports = (response, errorObj, code) => {
  console.log('API ERROR: ' + JSON.stringify(errorObj));
  response.status(code || 500).json({error: errorObj});
};
