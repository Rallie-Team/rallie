var passport = require('passport');
var jwt = require('jwt-simple');

module.exports = function(app){

  //we tell passport that we want to use facebook auth
  app.get('/facebook', passport.authenticate('facebook'));

  //able to handle the callback from facebook which will
  //give us the user information
  app.get('/facebook/callback', function(req, res, next){
    passport.authenticate('facebook', function(err, user, info){
      if(err){
        return next(err);
      } else {
        var token = jwt.encode(user, 'secret');
        res.json({token:token, user:user});
        res.redirect('/#');
      }
    })(req,res,next);

  });

};