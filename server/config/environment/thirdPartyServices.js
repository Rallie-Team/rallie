var localServices = {
 facebook: {
   id: process.env.FACEBOOK_ID,
   secret: process.env.FACEBOOK_SECRET,
   callback: (process.env.DOMAIN || '') + '/auth/facebook/callback'
 }
};

module.exports = localServices;