/**
 * Main application server
 */

// 'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var parser = require('body-parser');
var config = require('./config/environment');
var session = require('express-session');
var passport = require('passport');
var db = require('./db');
var cookieParser = require('cookie-parser');
var passport = require('passport');


db.init();
// TODO: Connect to database

// TODO: Eddie - Populate DB with sample data
// TODO: Eddie - Enter seed data line here

var app = express();
app.use (cookieParser());
app.use(session({ secret: 'joseki' }));

var server = require('http').createServer(app);

// Init database
db.init();

require('./config/express')(app);
require('./routes')(app, express, passport);


// TODO: Uncomment to get authentication to work
// require('./config/auth.js')(app, express, passport);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});


// Init database


app.use(passport.initialize());
app.use(passport.session());


// Expose app
exports = module.exports = app;