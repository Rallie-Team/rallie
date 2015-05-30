var FacebookStrategy = require('passport-facebook').Strategy;
var db = require('../db');
var localServices = require('../config/environment/thirdPartyServices');
var client = require('./facebookAuthInfo.js');


module.exports = function(passport){

  //The Facebook strategy allows users to log in to a web
  //application using their Facebook account.
  passport.use(new FacebookStrategy({

  //clientID and clientSecret need to remain private
  //we need to add this information to heroku
  clientID: localServices.facebook.id,
  clientSecret: localServices.facebook.secret,
  callbackURL: client.facebookAuth.callbackURL


  }, function(token, refreshToken, profile, done){
    console.log('im in authController');

    db.User.find({where: {'facebook_id' : profile.id}})
      .then(function(user){
        if(!user){
          //creates a new user which extracts the facbook ID and username
          //facebook ID is referenced so that users are not able to sign up
          //for more than one account. The null value represents that there
          //were no errors
          db.User.create({
            username: profile.name.givenName,
            facebook_id: profile.id
          })
          .then(function(newUser){
            return done(null, newUser);
          });
        } else {
          //if current user exists, we create the currentUser object
          //and then passed in was the return value.  The null value
          //represents that there were no errors
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
