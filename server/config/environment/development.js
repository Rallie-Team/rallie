// TODO: Create development environment database connection
module.exports = {
  postgres: {
    database: 'joseki',
    user: null,
    password: null,
    options: {
      host: 'localhost',
      dialect: 'postgres'
    }
  }
};