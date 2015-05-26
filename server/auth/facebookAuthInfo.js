//this is the file that we will use when we upload the project
//to heroku

var ip  = process.env.IP || 'http://localhost';
var port = process.env.PORT || 8080;
module.exports= {
  facebookAuth: {
    clientID : process.env.FACEBOOK_CLIENTID,
    clientSecret: process.env.FACEBOOK_CLIENTSECRET,
    callbackURL: ip  + '/Server/users/facebook/callback'
  }
};