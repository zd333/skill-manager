'use strict';

module.exports = (response, errorObj, code) => {
  console.log('API ERROR: ' + JSON.stringify(errorObj));
  if (response && typeof response.status === 'function') {
    response.status(code || 500).json({error: errorObj});
  }
};
