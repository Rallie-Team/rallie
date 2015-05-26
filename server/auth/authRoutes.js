var passport = require('passport');
var jwt = require('jwt-simple');

module.exports = function(app){

  app.get('/facebook', passport.authenticate('facebook'));

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