/**
 * Main application server
 */

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var config = require('./config/environment');
var db = require('./db');
var passport = require('passport');

var app = express();

var server = require('http').createServer(app);

// Init database
db.init();

// Load middlware
require('./config/express')(app);

// Define routes
require('./routes')(app, express, passport);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;