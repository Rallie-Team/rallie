/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {
  console.log(app.get('appPath'));

  // Insert routes below
  // Delete this route for things
  // app.use('/api/things', require('./api/thing'));
  // app.use('/api/action', require('./api/action'));
  app.use('/api/event', require('./api/event'));
  app.use('/api/observation', require('./api/observation'));
  // app.use('/api/user', require('./api/user')); 

  // app.use('Server/auth', require('./auth'));

  // All undefined asset or api routes should return a 404
  // TODO: Fix 404
  // app.route('/:url(api|auth|components|server|node_modules|bower_components|assets)/*')
  //  .get(errors[404]);

  // All other routes should redirect to the index.html
  // TODO: Code is working; however, returns a 304 status code. Need to resolve.
  // Already tried using "app.disable('etag')"
  app.route('/*')
    .get(function(req, res) {
      res.redirect('/');
    });

};
