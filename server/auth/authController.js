var FacebookStrategy = require('passport-facebook').Strategy;
var db = require('../db');
// var client = require('./facebookAuthInfo.js');


module.exports = function(passport){
  passport.use(new FacebookStrategy({

    clientID: ADDYOURSELF,
    clientSecret: ADDYOURSELF,
    callbackURL: client.facebookAuth.callbackURL

  }, function(token, refreshToken, profile, done){
    console.log('im in authController');
    User.findOne({'facebook.id' : profile.id}, function (err, user){
      if(err){
        console.error (err);
        return done (err);
      } else if (user) {
        return done(null, user);
      } else {
        db.User.create({
          username: profile.id,
          facebook_id: profile.name.givenName
        })
        .then(function(results){
          return done(null, results)
        .catch(function (error){
          next(new Error("couldn't add in user", error));
        });
      });
      }
   });
  }));
};