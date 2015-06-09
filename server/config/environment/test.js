// local test configuration file

module.exports = {
  secrets: {
    session: process.env.SESSION_SECRET
  },
  postgres: {
    database: 'joseki',
    user: process.env.DATABASE_USER || null,
    password: process.env.DATABASE_PASSWORD || null,
    options: {
      host: 'localhost',
      dialect: 'postgres'
    }
  },
  facebook: {
   id: process.env.FACEBOOK_ID,
   secret: process.env.FACEBOOK_SECRET,
   callback: process.env.FACEBOOK_CALLBACK
 }
};
