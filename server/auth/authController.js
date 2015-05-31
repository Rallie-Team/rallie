var FacebookStrategy = require('passport-facebook').Strategy;
var db = require('../db');
var config = require('../config/environment');

module.exports = function(passport){
  // Facebook strategy is the primary way for a user to log in the service
  passport.use(new FacebookStrategy({
    // Uses configuration file to set Facebook auth parameters
    clientID: config.facebook.id,
    clientSecret: config.facebook.secret,
    callbackURL: config.facebook.callback
  }, 
  function(token, refreshToken, profile, done){
    // console.log('im in authController');
    db.User.find({where: {'facebook_id' : profile.id}})
      .then(function(user){
        if(!user){
          // Creates a new user which extracts the Facbook ID and username
          // Facebook ID is referenced so that users are not able to sign up for more than one account
          db.User.create({
            username: profile.name.givenName,
            facebook_id: profile.id
          })
          .then(function(newUser){
            // null value represents that there were no errors
            return done(null, newUser);
          });
        } else {
          // Current user exists and create currentUser object
          var currentUser = {
            username: user.username,
            table_id: user.id
          };
          // null value represents that there were no errors
          return done(null, currentUser);
        }
      });
    }
   ));
};
