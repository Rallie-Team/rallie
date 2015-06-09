/**
 * Express configuration
 */

'use strict';

var express = require('express');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override'); // Adds PUT and DELETE HTTP requests
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var path = require('path');
var session = require('express-session');
var config = require('./environment');
var passport = require('passport');

module.exports = function(app) {
  var env = app.get('env');

  app.set('views', config.root + 'server/views');
  app.set('view engine', 'html');
  
  // Compression middleware
  app.use(compression());

  // Takes the data from the url and puts it into the body
  app.use(bodyParser.urlencoded({ extended: true }));

  // Ensures that all responses be stored in the body and only parses JSON data
  app.use(bodyParser.json());

  app.use(methodOverride());

  // Parse Cookie header and populate req.cookies with an object keyed by the cookie names
  app.use(cookieParser());
  
  // Set session secret
  app.use(session({secret: config.secrets.session}));

  // Initialize passport
  app.use(passport.initialize());

  // Use persistent login sessions
  app.use(passport.session());

  if ('production' === env) {
    // app.use(favicon(path.join(config.root, 'client/public', 'favicon.ico')));
    app.use(express.static(path.join(config.root, 'client/public')));
    app.set('appPath', config.root + 'client/public');
    app.use(morgan('dev'));
  }

  if ('development' === env || 'test' === env) {
    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(path.join(config.root, 'client/public')));
    app.set('appPath', 'client/public');
    app.use(morgan('dev'));
    app.use(errorHandler()); // Error handler - has to be last
  }
};
