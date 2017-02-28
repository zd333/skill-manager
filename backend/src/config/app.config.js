'use strict';

// TODO: add dev/prod mechanism
module.exports = {
  server: {
    port: 3042
  },
  db: {
    uri: 'mongodb://mongo:27017/skdsmdb'
  },
  googleAuth: {
    clientID: '625633771047-vbmhvssf8l3o48ib77n87irou3krj6cg.apps.googleusercontent.com',
    clientSecret: 'fDL0U6_q-cLPGrHg8g2-PyQN',
    callbackURL: 'http://localhost:3042/auth/google_callback'
  }
};
