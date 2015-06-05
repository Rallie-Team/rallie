var db = require('../db');

// EXAMPLE OF HOW TO CREATE A USER, THEN AN EVENT, AND FINALLY AN OBSERVATION TIED TO THE USER AND EVENT:
db.User.create({
  username: 'Kev'
}).then(function (user) {
  Event.create({
    name: 'Dance party',
    location: 'San Francisco',
    start: new Date(),
    end: new Date(currentDate.getTime() + 60 * 60 * 24 * 1000)
  }).then(function (event) {
    Observation.create({
      content: 'It is poppin in herrr',
      completed: false
    }).then(function (observation) {
      // Associate the observation to the event
      return event.addObservation(observation);
    }).then(function (observation) {
      // Associate the observation to the user
      user.addObservation(observation);
    });
  });
});

db.User.create({
  username: 'Johnny Tsunami'
}).then(function (user) {
  Event.create({
    name: 'I see you....',
    location: 'Lecture Area',
    start: new Date(),
    end: new Date(currentDate.getTime() + 60 * 60 * 24 * 1000)
  }).then(function (event) {
    Observation.create({
      content: 'Eddie King Kong',
      completed: false
    }).then(function (observation) {
      // Associate the observation to the event
      return event.addObservation(observation);
    }).then(function (observation) {
      // Associate the observation to the user
      user.addObservation(observation);
    });
  });
});

db.User.create({
  username: 'Eddie King Kong'
}).then(function (user) {
  Event.create({
    name: 'Building climbing',
    location: 'Lecture Area',
    start: new Date(),
    end: new Date(currentDate.getTime() + 60 * 60 * 24 * 1000)
  }).then(function (event) {
    Observation.create({
      content: 'Where are the ladies?',
      completed: false
    }).then(function (observation) {
      // Associate the observation to the event
      return event.addObservation(observation);
    }).then(function (observation) {
      // Associate the observation to the user
      user.addObservation(observation);
    });
  });
});
