/**
 * Main application routes
 */

var errors = require('./components/errors');

module.exports = function(app, express, passport) {
  var authRouter = express.Router();
  // Insert routes below

  app.use('/api/event', require('./api/event'));
  app.use('/api/observation', require('./api/observation'));
  app.use('/api/attendee', require('./api/attendee'));
  // app.use('/api/user', require('./api/user'));
  app.use('/auth', authRouter);

  require('./auth/authRoutes.js')(authRouter);
  require('./auth/authController.js')(passport);

  // All undefined asset or api routes should return a 404
  // TODO: Fix 404
  // app.route('/:url(api|auth|components|server|node_modules|bower_components|assets)/*')
  //  .get(errors[404]);

  // All other routes should redirect to the index.html
  // TODO: Code is working; however, returns a 304 status code. Need to resolve.
  // Already tried using "app.disable('etag')"
  //
  app.get('/_=_', function(req, res){
    res.redirect('/');
  });

  app.route('/*')
    .get(function(req, res) {
      res.redirect('/');
    });

};