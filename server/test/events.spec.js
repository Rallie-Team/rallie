var Sequelize = require('sequelize');
var request = require('supertest');
var express = require('express');
var app = require('../server.js');
var db = require('../db');
var expect = require('chai').expect;

var eventInstance, eventId, userInstance, userId;

// Create test user and event in db before tests
before(function(done) {
  db.init().then(function() {    
    db.User.create({
      username: 'Sheepish Shepherd'
    }).then(function(user) {
      userInstance = user;
      userId = user.id;
      var currentDate = new Date();
      db.Event.create({
        name: 'Herding cats',
        start: currentDate,
        end: new Date(currentDate.getTime() + 60 * 60 * 24 * 1000),
        location: 'San Francisco',
        minParticipants: 1,
        maxParticipants: 10
      }).then(function(event) {
        eventInstance = event;
        eventId = event.id;
        user.addShepherdEvent(event).then(function(shepherdEvent) {
          event.addShepherd(user).then(function(){
            done();
          });
        });
      });
    });
  });
});

// Delete test user and event from db after tests
after(function(done) {
  eventInstance.destroy().then(function() {
    userInstance.destroy().then(function() {
      done();
    });
  });
});

describe('Event API Endpoints', function() {
  var basePath = '/api/event';

  it('Should return 200 on GET ' + basePath, function(done) {
    request(app)
      .get(basePath)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(done);
  });

  it('Should return the correct event on GET ' + basePath + '/:eventId for a valid eventId', function(done) {
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

  it('Should return null on GET ' + basePath + '/:eventId for an invalid eventId', function(done) {
    request(app)
      .get(basePath + '/000')
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

  it('Should return an array on GET ' + basePath + '/user/:userId for a valid userId', function(done) {
    request(app)
      .get(basePath + '/user/' + userId)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(function(res) {
        if (!Array.isArray(res.body))
          throw new Error('Expected an array, received ' + JSON.stringify(res.body));
      })
      .end(done);
  });

  it('Should return a user\'s event on GET ' + basePath + '/user/:userId for a valid userId', function(done) {
    request(app)
      .get(basePath + '/user/' + userId)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(function(res) {
        if (res.body[0].id !== eventId) {
          throw new Error('Expected eventId ' + eventId + ', received ' + res.body[0].id);
        }
      })
      .end(done);
  });
});
