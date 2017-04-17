var Sequelize = require('sequelize');
var request = require('supertest');
var app = require('../server.js');
var db = require('../db');
var expect = require('chai').expect;

var eventInstance, eventId, shepherdInstance, shepherdId, sheepInstance, sheepId, observationInstance, observationId;

// Create test user and event in db before tests
before(function(done) {
  // Create shepherd  
  db.User.create({
    username: 'Sheepish Shepherd'
  }).then(function (shepherd) {
    // Create event
    shepherdInstance = shepherd;
    shepherdId = shepherd.id;
    var currentDate = new Date();
    return db.Event.create({
      name: 'Herding cats',
      start: currentDate,
      end: new Date(currentDate.getTime() + 60 * 60 * 24 * 1000),
      location: 'San Francisco',
      minParticipants: 1,
      maxParticipants: 10
    });
  }).then(function (event) {
    // Add shepherd to event
    eventInstance = event;
    eventId = event.id;
    return shepherdInstance.addShepherdEvent(event);
  }).then(function() {
    // Create sheep
    return db.User.create({
      username: 'Lonely Sheep'
    });
  }).then(function(sheep) {
    // Add sheep to event
    sheepInstance = sheep;
    sheepId = sheep.id;
    return sheep.addSheepEvent(eventInstance);
  }).then(function() {
    // Create observation
    db.Observation.create({
      content: 'These cats are crazy',
      completed: false,
      UserId: sheepId,
      EventId: eventId
    }).then(function(observation) {
      // Associate the observation with the event
      observationInstance = observation;
      observationId = observation.id;
      return eventInstance.addObservation(observation);
    }).then(function() {
      // Associate the observation with the sheep
      return sheepInstance.addObservation(observationInstance);
    }).then(function() {
      done();
    });
  });
});

// Delete test observation, event, and users from db after tests
after(function(done) {
  observationInstance.destroy().then(function() {
    eventInstance.destroy().then(function() {
      sheepInstance.destroy().then(function() {
        shepherdInstance.destroy().then(function() {
          done();
        });
      });
    });
  });
});

describe('Observation API Endpoints', function() {
  var basePath = '/api/observation';

  describe('/api/observation/:eventId', function() {
    it('Should return an array with the observation on GET for a valid eventId', function(done) {
      request(app)
        .get(basePath + '/' + eventId)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(function(res) {
          if (!Array.isArray(res.body))
            throw new Error('Expected an array, received ' + JSON.stringify(res.body));
        })
        .expect(function(res) {
          if (res.body[0].id !== observationId)
            throw new Error('Expected observation ID ' + observationId + ', received ' + res.body[0].id);
        })
        .end(done);
    });

    it('Should return an empty array on GET for an invalid eventId', function(done) {
      request(app)
        .get(basePath + '/0')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(function(res) {
          if (res.body.length > 0) {
            throw new Error('Expected an empty array, received ' + JSON.stringify(res.body));
          }
        })
        .end(done);
    });
  });

  describe('/api/observation/create', function() {
    it('Should create a new observation on POST', function(done) {
      var observation = {content: 'Smelly cats!', userId: sheepId, eventId: eventId};
      request(app)
        .post(basePath + '/create')
        .set({'Content-Type': 'application/json', Accept: 'application/json'})
        .send(observation)
        .expect(200)
        .expect(function(res) {
          // Remove observation from database before finishing
          db.Observation.findOne({
            where: {
              id: res.body.id
            }
          }).then(function(observation) {
            // return sheepInstance.removeObservation(observation);
            observation.destroy();
          });
        })
        .expect(function(res) {
          if (res.body.content !== 'Smelly cats!')
            throw new Error('Expected observation ' + JSON.stringify(observation) + ', received ' + JSON.stringify(res.body));
        })
        .end(done);
    });

    it('Should not create a new observation on POST for an invalid eventId', function(done) {
      var observation = {content: 'Smelly cats', userId: sheepId, eventId: 0};
      request(app)
        .post(basePath + '/create')
        .set({'Content-Type': 'application/json', Accept: 'application/json'})
        .send(observation)
        .expect(400, done);
    });

    it('Should not create a new observation on POST for an invalid userId', function(done) {
      var observation = {content: 'Smelly cats', userId: 0, eventId: eventId};
      request(app)
        .post(basePath + '/create')
        .set({'Content-Type': 'application/json', Accept: 'application/json'})
        .send(observation)
        .expect(400, done);
    });

    it('Should correctly handle POSTs with no userId', function(done) {
      var observation = {content: 'Smelly cats', eventId: eventId};
      request(app)
        .post(basePath + '/create')
        .set({'Content-Type': 'application/json', Accept: 'application/json'})
        .send(observation)
        .expect(400, done);
    });

    it('Should correctly handle POSTs with no eventId', function(done) {
      var observation = {content: 'Smelly cats', userId: sheepId};
      request(app)
        .post(basePath + '/create')
        .set({'Content-Type': 'application/json', Accept: 'application/json'})
        .send(observation)
        .expect(400, done);
    });
  });
});
