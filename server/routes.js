/**
 * Main application routes
 */
// 'use strict';

var errors = require('./components/errors');

module.exports = function(app, express, passport) {
  console.log(app.get('appPath'));
  // console.log(app);
  // console.log(express);
  //
  //


   var authRouter = express.Router();
  // Insert routes below
  // Delete this route for things
  // app.use('/api/things', require('./api/thing'));
  // app.use('/api/action', require('./api/action'));

  app.use(passport.initialize());
  app.use(passport.session());

  app.use('/api/event', require('./api/event'));
  app.use('/api/observation', require('./api/observation'));
  app.use('/api/attendees', require('./api/attendee'));
  // app.use('/api/user', require('./api/user'));
  app.use('/Server/auth', authRouter);
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