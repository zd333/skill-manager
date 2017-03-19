'use strict';

module.exports = {
  server: {
    port: process.env.SKDSM_PORT || 3042
  },
  db: {
    uri: process.env.SKDSM_MONGO_CONN || 'mongodb://mongo:27017/skdsmdb'
  },
  auth: {
    google: {
      clientSecret: process.env.SKDSM_GOOGLE_CLIENT_SECRET || 'fDL0U6_q-cLPGrHg8g2-PyQN',
      accessTokenUrl: 'https://www.googleapis.com/oauth2/v3/token',
      peopleApiUrl: 'https://www.googleapis.com/plus/v1/people/me/openIdConnect',
      allowedDomain: 'steelkiwi.com'
    }
  }
};
