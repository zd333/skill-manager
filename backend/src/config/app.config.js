'use strict';

// TODO: add dev/prod mechanism
module.exports = {
  server: {
    port: 3042
  },
  db: {
    uri: 'mongodb://mongo:27017/skdsmdb'
  },
  auth: {
    google: {
      clientSecret: 'fDL0U6_q-cLPGrHg8g2-PyQN',
      accessTokenUrl: 'https://www.googleapis.com/oauth2/v3/token',
      peopleApiUrl: 'https://www.googleapis.com/plus/v1/people/me/openIdConnect',
      allowedDomain: 'steelkiwi.com'
    }
  }
};
