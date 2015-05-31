// local development configuration file
var localServices = require('./thirdPartyServices.js');

module.exports = {
  postgres: {
    database: 'joseki',
    user: null,
    password: null,
    options: {
      host: 'localhost',
      dialect: 'postgres'
    }
  },
  facebook: {
   id: localServices.facebook.id,
   secret: localServices.facebook.secret,
   callback: 'http://localhost:3000/auth/facebook/callback'
 }
};
