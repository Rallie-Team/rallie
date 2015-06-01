var FacebookStrategy = require('passport-facebook').Strategy;
var db = require('../db');
var localServices = require('../config/environment/thirdPartyServices');
var config = require('../config/environment');
// var client = require('./facebookAuthInfo.js');


module.exports = function(passport){

  //The Facebook strategy allows users to log in to a web
  //application using their Facebook account.
  passport.use(new FacebookStrategy({

  //clientID and clientSecret need to remain private
  //we need to add this information to heroku
  clientID: config.facebook.id,
  clientSecret: config.facebook.secret,
  callbackURL: config.facebook.callback

   }, function(token, refreshToken, profile, done){
    // console.log(profile.id);

    db.User.find({where: {'facebook_id' : profile.id}})
      .then(function(user){
        if(!user){
          // console.log('creating new user');
          db.User.create({
            username: profile.name.givenName,
            facebook_id: profile.id
          })
          .then(function(newUser){
            // console.log(newUser, '----------------------');
            return done(null, newUser);
          });
        } else {
          var currentUser = {
            username: user.username,
            table_id: user.id
          };
          return done(null, currentUser);
        }
      });
    }
  ));
};