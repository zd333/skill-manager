'use strict';

module.exports = (res, errorObj, code) => {
  console.log('API ERROR: ' + JSON.stringify(errorObj));
  res.status(code || 500).json({error: errorObj});
};
