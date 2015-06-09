// local development configuration file
var localServices = require('./thirdPartyServices.js');

module.exports = {
  secrets: {
    session: localServices.secrets.session
  },
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
   callback: localServices.facebook.callback
 }
};
