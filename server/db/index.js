var Sequelize = require('sequelize');
var config = require('../config/environment');

var User, Event, Observation;

var init = function() {
  var orm;

  // Use different parameters for initializing the Sequelize instance depending on environment
  if (config.postgres.uri) {
    // The production environment should have a DATABASE_URL environment variable, which includes a URL
    // with username, password, host, port, and database. The URL will be set in config/environment/production.js.
    orm = new Sequelize(config.postgres.uri, config.postgres.options);
  } else {
    // The development environment will not use a URL, and each config parameter
    // will be set in config/environment/development.js
    orm = new Sequelize(config.postgres.database, config.postgres.user, config.postgres.password, config.postgres.options);
  }

  User = orm.define('User', {
    username: Sequelize.STRING,
    facebook_id: Sequelize.STRING
  });

  Event = orm.define('Event', {
    name: Sequelize.STRING,
    start: Sequelize.DATE,
    end: Sequelize.DATE,
    location: Sequelize.STRING,
    minParticipants: Sequelize.INTEGER,
    maxParticipants: Sequelize.INTEGER,
    action: Sequelize.STRING
  });

  Observation = orm.define('Observation', {
    content: Sequelize.STRING,
    completed: Sequelize.BOOLEAN,
    rawImage: Sequelize.TEXT
  });



  /**
   * MODEL RELATIONS
   * belongsToMany connects a source with multiple targets, and the targets can connect to multiple sources
   * Using a `through` option will create a new model with foreign keys for the source and target
   *
   * Example:
   * User.belongsToMany(Event, {as: 'ShepherdEvents', through: 'ShepherdEvent'});
   * Event.belongsToMany(User, {as: 'Shepherds', through: 'ShepherdEvent'});
   *
   * We create a many-to-many relationship between users and events, and the join table is called ShepherdEvent.
   * The ShepherdEvent table will have a foreign key for EventId and UserId.
   * The User and Event models will have get, set, and add methods. For example, user.getShepherdEvents()
   * will return all instances of a ShepherdEvent belonging to that user, and each instance would reference the
   * Event the user is a shepherd for.
   *
   * See http://sequelize.readthedocs.org/en/latest/docs/associations/#belongs-to-many-associations
   *
   * hasMany connects a source with multiple targets, but the targets can only connect to one source
   *
   * See http://sequelize.readthedocs.org/en/latest/docs/associations/#one-to-many-associations
   */

  User.belongsToMany(Event, {as: 'ShepherdEvents', through: 'ShepherdEvent'});
  Event.belongsToMany(User, {as: 'Shepherds', through: 'ShepherdEvent'});
  User.belongsToMany(Event, {as: 'SheepEvents', through: 'SheepEvent'});
  Event.belongsToMany(User, {as: 'Sheep', through: 'SheepEvent'});
  User.hasMany(Observation);
  Observation.belongsTo(User);
  Event.hasMany(Observation);
  Observation.belongsTo(Event);



  // EXAMPLE OF HOW TO CREATE A USER, THEN AN EVENT, AND FINALLY AN OBSERVATION TIED TO THE USER AND EVENT:
  // User.create({
  //   username: 'Kev'
  // }).then(function (user) {
  //   Event.create({
  //     name: 'Dance party',
  //     location: 'San Francisco'
  //   }).then(function (event) {
  //     Observation.create({
  //       content: 'It is poppin in herrr',
  //       completed: false
  //     }).then(function (observation) {
  //       // Associate the observation to the event
  //       return event.addObservation(observation);
  //     }).then(function (observation) {
  //       // Associate the observation to the user
  //       user.addObservation(observation);
  //     });
  //   });
  // });

  // EXAMPLE OF HOW TO CREATE A USER, A SHEEP, AND ADD THE USER TO AN EXISTING EVENT
  // User.create({
  //   username: 'Derek'
  // }).then(function (user) {
  //   var sheepId = user.id;
  //   Event.findOne({
  //     where: {
  //       name: 'Dance party'
  //     }
  //   }).then(function (event) {
  //     event.addSheep(sheepId);
  //   });
  // });

  // EXAMPLE OF HOW TO CREATE A USER, A SHEEP, ADD AND THEN REMOVE THE USER TO AND FROM AN EXISTING EVENT
  // var eventId, eventInstance, userInstance;
  // User.create({
  //   username: 'Eddie'
  // }).then(function (user) {
  //   userInstance = user;
  //   Event.findOne({
  //     where: {
  //       name: 'Dance party'
  //     }
  //   }).then(function (event) {
  //     eventInstance = event
  //     event.addSheep(user);
  //   }).then(function (user) {
  //     userInstance.removeSheepEvent(eventInstance);
  //   });
  // });

  // export all models
  exports.User = User;
  exports.Event = Event;
  exports.Observation = Observation;

  // sync all models
  // return orm.sync();
  return orm.sync({force:true}).then(function(){

    User.bulkCreate([
      { username: 'steven', facebook_id: 123},
      { username: 'derek', facebook_id: 124},
      { username: 'kevin', facebook_id: 125},
      { username: 'eddie', facebook_id: 126}
    ]);


    Event.bulkCreate([
      { name: 'thing1', start: 'June 17, 2015 13:00:00', end: 'June 17, 2015 14:00:00', location: 'San Francisco', minParticipants: 0, maxParticipants: 4, action:''},
      { name: 'thing2', start: 'June 17, 2015 13:00:00', end: 'June 17, 2015 14:00:00', location: 'San Francisco', minParticipants: 0, maxParticipants: 4, action:'' },
      { name: 'thing3', start: 'June 17, 2015 13:00:00', end: 'June 17, 2015 14:00:00', location: 'San Francisco', minParticipants: 0, maxParticipants: 4, action:'' },
      { name: 'thing4', start: 'June 17, 2015 13:00:00', end: 'June 17, 2015 14:00:00', location: 'San Francisco', minParticipants: 0, maxParticipants: 4, action:'' },
      { name: 'thing5', start: 'June 17, 2015 13:00:00', end: 'June 17, 2015 14:00:00', location: 'San Francisco', minParticipants: 0, maxParticipants: 4, action:'' }
    ]);

    Observation.bulkCreate([
      {content: 'yes1', completed: false, rawImage: ''},
      {content: 'yes2', completed: false, rawImage: ''},
      {content: 'yes3', completed: false, rawImage: ''},
      {content: 'yes4', completed: false, rawImage: ''},
      {content: 'yes5', completed: false, rawImage: ''}
    ]);



  var user1;
  var event1;
  var observation1;

  User.findOne({
    where: {
    id: 1
  }
  }).then(function (user) {
    user1 = user;
    console.log(user1);
    Event.findOne({
      where: {
      id: 1
      }
    }).then(function (event) {
      event1 = event;
      console.log(event1);
      Observation.findOne({
        where: {
          id:1
        }
      }).then(function(observation){
        observation1 = observation;
      });
    });
  });

  var user2;
  var event2;
  var observation2;

  User.findOne({
    where: {
    id: 2
  }
  }).then(function (user) {
    user2 = user;
    Event.findOne({
      where: {
      id: 2
      }
    }).then(function (event) {
      event2 = event;
      Observation.findOne({
        where: {
          id: 2
        }
      }).then(function(observation){
        observation2 = observation;
      });
    });
  });

  var user3;
  var event3;
  var observation3;

  User.findOne({
    where: {
    id: 3
  }
  }).then(function (user) {
    user3 = user;
    Event.findOne({
      where: {
      id: 3
      }
    }).then(function (event) {
      event3 = event;
      Observation.findOne({
        where: {
          id:3
        }
      }).then(function(observation){
        observation3 = observation;
      });
    });
  });

  var user4;
  var event4;
  var observation4;

  User.findOne({
    where: {
    id: 4
  }
  }).then(function (user) {
    user4 = user;
    Event.findOne({
      where: {
      id: 4
      }
    }).then(function (event) {
      event4 = event;
      Observation.findOne({
        where: {
          id:4
        }
      }).then(function(observation){
        observation4 = observation;


        user1.addObservation(observation1);
        event1.addObservation(observation1);
        user2.addObservation(observation2);
        event1.addObservation(observation2);

        user1.addObservation(observation1);
        event2.addObservation(observation1);
        user1.addObservation(observation3);
        event2.addObservation(observation3);

        user2.addObservation(observation2);
        event2.addObservation(observation2);
        user3.addObservation(observation2);
        event2.addObservation(observation2);

        user1.addShepherdEvent(event1);
        user1.addShepherdEvent(event2);
        user1.addShepherdEvent(event3);
        user1.addShepherdEvent(event4);

        user1.addSheepEvent(event2);
        user3.addSheepEvent(event2);
        user4.addSheepEvent(event2);

        user2.addSheepEvent(event1);
        user3.addSheepEvent(event2);
        user4.addSheepEvent(event2);


      });
    });
  });


  console.log(user1);
  console.log(event1);
  console.log(observation1);


  // user1.addObservation(observation1);
  // event1.addObservation(observation1);
  // user2.addObservation(observation2);
  // event1.addObservation(observation2);

  // user1.addObservation(observation1);
  // event2.addObservation(observation1);
  // user2.addObservation(observation2);
  // event2.addObservation(observation2);


  // user1.addShepherdEvent(event2);
  // user1.addShepherdEvent(event3);
  // user1.addShepherdEvent(event4);

  // user1.addSheepEvent(event2);
  // user2.addSheepEvent(event1);
  // user3.addSheepEvent(event2);
  // user4.addSheepEvent(event2);





  //   ShepherdEvents.bulkCreate([
  //     {EventId: 1,
  //         UserId: 1}
  //     ]);

  //   // (User[1]).addShepherdEvent( Event[1]);

  });
};

exports.init = init;
