// TODO: Create production environment database connection
module.exports = {
  postgres: {
    // The DATABASE_URL variable should already include the username, password, host, port, and database name
    uri: process.env.DATABASE_URL
  },
  facebook: {
    id: process.env.FACEBOOK_ID,
    secret: process.env.FACEBOOK_SECRET,
    callback: process.env.FACEBOOK_CALLBACK
  }
};