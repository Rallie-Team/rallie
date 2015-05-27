/**
 * Main application server
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var parser = require('body-parser');
var config = require('./config/environment');
var passport = require('passport');

// TODO: Connect to database


// TODO: Eddie - Populate DB with sample data
// TODO: Eddie - Enter seed data line here

var app = express();
var server = require('http').createServer(app);

require('./config/express')(app);
require('./routes')(app);

// process.env.NODE_ENV above sets the envirment
// app.set('port', process.env.PORT || 3000);

// require('./config/auth.js')(app, express, passport);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
