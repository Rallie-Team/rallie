var passport = require('passport');
var jwt = require('jwt-simple');
var querystring = require('querystring');

module.exports = function(app){

  //we tell passport that we want to use facebook auth
  app.get('/facebook', passport.authenticate('facebook'));

  //able to handle the callback from facebook which will
  //give us the user information
  app.get('/facebook/callback', function(req, res, next){
    passport.authenticate('facebook', function(err, user){
      if(err){
        return next(err);
      } else {
        var token = jwt.encode(user, 'secret');
        res.redirect('/?' + querystring.stringify({user: user.username}) + '&' + querystring.stringify({id: user.table_id})+ '&' + querystring.stringify({token: token}));
      }
    })(req,res,next);
  });

};
