var Sequelize = require('sequelize');
var request = require('supertest');
var app = require('../server.js');
var db = require('../db');
var expect = require('chai').expect;

var eventInstance, eventId, shepherdInstance, shepherdId, sheepInstance, sheepId;

// Create test shepherd, sheep, and event in db before tests
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
    sheepInstance = sheep;
    sheepId = sheep.id;
    done();
  });
});

// Delete test shepherd, sheep, and event from db after tests
after(function(done) {
  eventInstance.destroy().then(function() {
    shepherdInstance.destroy().then(function() {
      sheepInstance.destroy().then(function () {
        done();
      });
    });
  });
});

describe('Event API Endpoints', function() {
  var basePath = '/api/event';

  describe('basePath', function() {
    it('Should include the test event in the array of events', function(done) {
      request(app)
        .get(basePath)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(function(res) {
          var events = res.body;
          var testEvent = events.filter(function(event) {
            return event.id === eventId;
          });
          if (!testEvent.length)
            throw new Error('Expected eventId ' + eventId + ' within array, received ' + JSON.stringify(events));
        })
        .end(done);
    });
  });

  describe(basePath + '/:eventId', function() {
    it('Should return the correct event on GET for a valid eventId', function(done) {
      request(app)
        .get(basePath + '/' + eventId)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(function(res) {
          if (res.body.id !== eventId)
            throw new Error('Expected eventId ' + eventId + ', received eventId ' + res.body.id);
        })
        .end(done);
    });

    it('Should return null on GET for an invalid eventId', function(done) {
      request(app)
        .get(basePath + '/0')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(function(res) {
          if (res.body !== null) {
            throw new Error('Expected null, received ' + JSON.stringify(res.body));
          }
        })
        .end(done);
    });

    it('Should return 400 on GET for a non-numeric eventId', function(done) {
      request(app)
        .get(basePath + '/event1')
        .expect(400, done);
    });

    it('Should update event details on PUT for an valid eventId', function(done) {
      var eventDetails = {name: 'Herding dogs', location: 'San Francisco'};
      request(app)
        .put(basePath + '/' + eventId)
        .set('Content-Type', 'application/json')
        .send(eventDetails)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          if (res.body.name !== 'Herding dogs')
            throw new Error('Expected name to be "Herding dogs", received ' + res.body.name);
        })
        .end(done);
    });

    it('Should not update an event on PUT for an invalid eventId', function(done) {
      var eventDetails = {name: 'New name', location: 'New location'};
      request(app)
        .put(basePath + '/0')
        .set('Content-Type', 'application/json')
        .send(eventDetails)
        .expect(400, done);
    });

    it('Should return 400 on PUT for a non-numeric eventId', function(done) {
      request(app)
        .put(basePath + '/event1')
        .expect(400, done);
    });
  });

  describe(basePath + '/sheep', function() {
    it('Should return an array on GET', function(done) {
      request(app)
        .get(basePath + '/sheep')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(function(res) {
          if (!Array.isArray(res.body))
            throw new Error('Expected an array, received ' + JSON.stringify(res.body));
        })
        .end(done);
    });
  });

  describe(basePath + '/shepherd/:userId', function() {
    it('Should return an array on GET for a valid userId', function(done) {
      request(app)
        .get(basePath + '/shepherd/' + shepherdId)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(function(res) {
          if (!Array.isArray(res.body))
            throw new Error('Expected an array, received ' + JSON.stringify(res.body));
        })
        .end(done);
    });

    it('Should include a user\'s event on GET for a valid userId', function(done) {
      request(app)
        .get(basePath + '/shepherd/' + shepherdId)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(function(res) {
          var events = res.body;
          var usersEvents = events.filter(function(event) {
            return event.id === eventId;
          });
          if (!usersEvents.length)
            throw new Error('Expected eventId ' + eventId + ' within array, received ' + JSON.stringify(events));
        })
        .end(done);
    });

    it('Should return a 400 on GET for an invalid userId', function(done) {
      request(app)
        .get(basePath + '/shepherd/0')
        .expect(400, done);
    });

    it('Should return a 400 on GET for a non-numeric userId', function(done) {
      request(app)
        .get(basePath + '/shepherd/shepherd1')
        .expect(400, done);
    });
  });

  describe(basePath + '/create', function() {
    it('Should create a new event on POST', function(done) {
      var newEvent = {name: 'Cat dance party', location: 'The Cat House', start: '1970-01-01T00:00:00.000Z', userId: shepherdId};
      request(app)
        .post(basePath + '/create')
        .set({'Content-Type': 'application/json', Accept: 'application/json'})
        .send(newEvent)
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(function(res) {
          return db.Event.destroy({
            where: {
              id: res.body.id
            }
          }).then(function() {
            if (res.body.name !== newEvent.name || res.body.location !== newEvent.location || 
                res.body.start !== newEvent.start) {
              throw new Error('Expected ' + JSON.stringify(newEvent) + ', received ' + JSON.stringify(res.body));
            }
          });
        })
        .end(done);
    });

    it('Should not create a new event on POST if no userId is supplied', function(done) {
      var newEvent = {name: 'Cat dance party', location: 'The Cat House', start: '1970-01-01T00:00:00.000Z'};
      request(app)
        .post(basePath + '/create')
        .set('Content-Type', 'application/json')
        .send(newEvent)
        .expect(400, done);
    });

    it('Should not create a new event on POST if an invalid userId is supplied', function(done) {
      var newEvent = {name: 'Cat dance party', location: 'The Cat House', start: '1970-01-01T00:00:00.000Z', userId: 0};
      request(app)
        .post(basePath + '/create')
        .set('Content-Type', 'application/json')
        .send(newEvent)
        .expect(400, done);
    });

    it('Should not create a new event on POST if a non-numeric userId is supplied', function(done) {
      var newEvent = {name: 'Cat dance party', location: 'The Cat House', start: '1970-01-01T00:00:00.000Z', userId: 'user1'};
      request(app)
        .post(basePath + '/create')
        .set('Content-Type', 'application/json')
        .send(newEvent)
        .expect(400, done);
      });
  });

  describe(basePath + '/add-participant/:eventId', function() {
    it('Should add a participant to an event on POST for a valid userId and eventId', function(done) {
      request(app)
        .post(basePath + '/add-participant/' + eventId)
        .set('Content-Type', 'application/json')
        .send({id: sheepId})
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          if (res.body.id !== sheepId)
            throw new Error('Expected sheep ID ' + sheepId + ', received ' + res.body.id);
        })
        .end(done);
    });

    it('Should not add a participant to an event on POST for a valid userId but invalid eventId', function(done) {
      request(app)
        .post(basePath + '/add-participant/0')
        .set('Content-Type', 'application/json')
        .send({id: sheepId})
        .expect(400, done);
    });

    it('Should not add a participant to an event on POST for an invalid sheepId but valid eventId', function(done) {
      request(app)
        .post(basePath + '/add-participant/' + eventId)
        .set('Content-Type', 'application/json')
        .send({id: 0})
        .expect(400, done);
    });

    it('Should not add a participant to an event on POST for a non-numeric sheepId', function(done) {
      request(app)
        .post(basePath + '/add-participant/' + eventId)
        .set('Content-Type', 'application/json')
        .send({id: 'sheep1'})
        .expect(400, done);
    });

    it('Should not add a participant to an event on POST for a non-numeric eventId', function(done) {
      request(app)
        .post(basePath + '/add-participant/event1')
        .set('Content-Type', 'application/json')
        .send({id: sheepId})
        .expect(400, done);
    });
  });

  describe(basePath + '/remove-participant/:eventId', function() {
    it('Should remove a participant from an event on DELETE for a valid sheepId and eventId', function(done) {
      request(app)
        .post(basePath + '/add-participant/' + eventId)
        .set('Content-Type', 'application/json')
        .send({id: sheepId})
        .expect(200)
        .expect(function(res) {
          if (res.body.id !== sheepId)
            throw new Error('');
        })
        .end(function(err) {
          if (err) {
            done(err);
          } else {
            request(app)
              .del(basePath + '/remove-participant/' + eventId)
              .set('Content-Type', 'application/json')
              .send({id: sheepId})
              .expect(200)
              .expect(function(res) {
                if (res.body.id !== sheepId)
                  throw new Error('Expected userId ' + sheepId + ', received ' + res.body.id);
              })
              .end(done);
          }
        });
    });

    it('Should not remove a participant from an event on DELETE when no userId is supplied', function(done) {
      request(app)
        .del(basePath + '/remove-participant/' + eventId)
        .set('Content-Type', 'application/json')
        .send()
        .expect(400, done);
    });

    it('Should not remove a participant from an event on DELETE for a valid userId but invalid eventId', function(done) {
      request(app)
        .del(basePath + '/remove-participant/0')
        .set('Content-Type', 'application/json')
        .send({id: sheepId})
        .expect(400, done);
    });

    it('Should not remove a participant from an event on DELETE for an invalid userId but valid eventId', function(done) {
      request(app)
        .del(basePath + '/remove-participant/' + eventId)
        .set('Content-Type', 'application/json')
        .send({id: 0})
        .expect(400, done);
    });

    it('Should not remove a participant from an event on DELETE for a non-numeric userId', function(done) {
      request(app)
        .del(basePath + '/remove-participant/' + eventId)
        .set('Content-Type', 'application/json')
        .send({id: 'sheep1'})
        .expect(400, done);
    });

    it('Should not remove a participant from an event on DELETE for a non-numeric eventId', function(done) {
      request(app)
        .del(basePath + '/remove-participant/event1')
        .set('Content-Type', 'application/json')
        .send({id: sheepId})
        .expect(400, done);
    });
  });
});
