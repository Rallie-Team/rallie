'use strict';

var path = require('path');
var _ = require('lodash');
var localServices = require('./thirdPartyServices.js')

function requiredProcessEnv(name) {
  if(!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 3000,

  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'joseki-secret'
  },

  // List of user roles
  userRoles: ['guest', 'user', 'admin'],

  // TODO: Database connection options
  database: {
    options: {
      db: {
        safe: true
      }
    }
  },

  facebook: {
    clientID:     localServices.facebook.id,
    clientSecret: localServices.facebook.secret,
    callbackURL:  localServices.facebook.callback
  },

};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});
