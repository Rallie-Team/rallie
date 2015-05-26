var FacebookStrategy = require('passport-facebook').Strategy;
var db = require('../db');
// var client = require('./facebookAuthInfo.js');


module.exports = function(passport){

  //The Facebook strategy allows users to log in to a web
  //application using their Facebook account.
  passport.use(new FacebookStrategy({

  //clientID and clientSecret need to remain private
  //we need to add this information to heroku
  clientID: ADDYOURSELF,
  clientSecret: ADDYOURSELF,
  callbackURL: client.facebookAuth.callbackURL

  }, function(token, refreshToken, profile, done){
    console.log('im in authController');

    //function looks to see if the user id is in the system
    User.findOne({'facebook.id' : profile.id}, function (err, user){
      if(err){
        console.error (err);
        return done (err);
      } else if (user) {
        //if it is in the system, we return the user information
        return done(null, user);
      } else {
        //if it is not in the system, we create user information
        //in the system
        db.User.create({
          username: profile.id,
          facebook_id: profile.name.givenName
        })
        //return user information when done
        .then(function(results){
          return done(null, results)
        //return error if user is not found
        .catch(function (error){
          next(new Error("couldn't add in user", error));
        });
      });
      }
   });
  }));
};