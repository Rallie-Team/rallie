var passport = require('passport');
var jwt = require('jwt-simple');
var querystring = require('querystring');

module.exports = function(app){
  // Tell Passport that we want to use Facebook auth
  app.get('/facebook', passport.authenticate('facebook'));
  // Handle the callback from Facebook to give us the user information
  app.get('/facebook/callback', function(req, res, next){
    passport.authenticate('facebook', function(err, user){
      if(err){
        return next(err);
      } else {
        var token = jwt.encode(user, 'secret');
        res.redirect(
          '/?' + querystring.stringify({user: user.username}) +
          '&' + querystring.stringify({id: user.table_id})+
          '&' + querystring.stringify({token: token})
        );
      }
    })(req,res,next);
  });

};
