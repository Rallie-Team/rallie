var passport = require('passport');

module.exports = function(app){
  // Tell Passport that we want to use Facebook auth
  app.get('/facebook', passport.authenticate('facebook'));
  // Handle the callback from Facebook to give us the user information
  app.get('/facebook/callback', function(req, res, next){
    passport.authenticate('facebook', function(err, user){
      if (err) {
        return next(err);
      } else {
        res.cookie('username', user.username);
        res.cookie('id', user.id);
        res.redirect('/events');
      }
    })(req,res,next);
  });
};
