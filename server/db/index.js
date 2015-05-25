var Sequelize = require('sequelize');
var orm = new Sequelize('joseki', 'VacantAardvark', 'onedirtyride');

// TODO: Does sequelize add createdAt and updatedAt?

var User = orm.define('User', {
  username: Sequelize.STRING,
  facebook_id: Sequelize.STRING
});

var Shepherd = orm.define('Shepherd', {
  user_id: Sequelize.INTEGER,
  event_id: Sequelize.INTEGER
});

var Sheep = orm.define('Sheep', {
  user_id: Sequelize.INTEGER,
  event_id: Sequelize.INTEGER
});

var Event = orm.define('Event', {
  eventName: Sequelize.STRING,
  start: Sequelize.DATE,
  end: Sequelize.DATE,
  location: Sequelize.STRING,
  minParticipants: Sequelize.INTEGER,
  maxParticipants: Sequelize.INTEGER,
  action: Sequelize.STRING
});

var Observation = orm.define('Observation', {
  user_id: Sequelize.INTEGER,
  event_id: Sequelize.INTEGER,
  content: Sequelize.STRING,
  completed: Sequelize.BOOLEAN
});

// table relations
// TODO: build out table relations

Shepherd.hasMany(User);
Shepherd.hasMany(Event);
User.hasMany(Observation);
User.hasOne(Shepherd);
Event.hasMany(Observation);
Event.hasMany(Shepherd);
Observation.hasOne(Event);
Observation.belongsTo(User);

// sync all tables
User.sync();
Shepherd.sync();
Sheep.sync();
Event.sync();
Observation.sync();

// export all tables
exports.User = User;
exports.Shepherd = Shepherd;
exports.Sheep = Sheep;
exports.Event = Event;
exports.Observation = Observation;
