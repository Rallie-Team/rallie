var router = require('express').Router();
var db = require('../../db');

// Return a list of all, unfiltered events
router.get('/', function (req, res) {
  db.Event.findAll().then(function(results) {
    res.json(results);
  }, function() {
    res.sendStatus(500);
  });
});

// Return a list of all events for a user where the user is a shepherd
router.get('/shepherd/:userId', function(req, res) {
  // Check if userId was supplied and is a number
  if (!isNaN(req.params.userId)) {
    // userId was supplied and is a number
    // First find user by userId
    db.User.findOne({
      where: {
        id: +req.params.userId
      }
    }).then(function (user) {
      if (user) {
        // User exists, find all events where the user is a shepherd
        user.getShepherdEvents({
          where: {
            end: {
              // Filters events where end date is greater than the current timestamp
              $gt: new Date()
            }
          },
          order: 'start'
        }).then(function(results) {
          // Return all events where the user is a shepherd
          res.json(results);
        }, function() {
          // Unexpected error from retrieving a shepherd's events
          res.sendStatus(500);
        });
      } else {
        // User does not exist
        res.status(400).send('User does not exist');
      }
    }, function() {
      // Unexpected error from finding a user
      res.sendStatus(500);
    });
  } else {
    // userId was not supplied or is not a number
    res.status(400).send('Invalid userId');
  }
});

/**
 * Returns an array of event objects from the Event table, attended by a sheep, according to the
 * SheepEvent join table
 */
router.get('/sheep/:userId', function(req, res) {
  if (!isNaN(req.params.userId)) {
    db.User.findOne({
      where: {
        id: +req.params.userId
      }
    }).then(function (user) {
      if (user) {
        user.getSheepEvents({
          where: {
            end: {
              $gt: new Date()
            }
          },
          order: 'start'
        }).then(function(results) {
          res.json(results);
        }, function() {
          // Unexpected error from retrieving the sheep's events
          res.sendStatus(500);
        });
      } else {
        // User does not exist
        res.status(400).send('User does not exist');
      }
    }, function() {
      // Unexpected error from finding a user
      res.sendStatus(500);
    });
  } else {
    // userId was not supplied or is not a number
    res.status(400).send('Invalid userId');
  }
});

// Return a list of all events that have not ended yet, filtering is done in EventStore
router.get('/sheep', function(req, res) {
  db.Event.findAll({
    where: {
      end: {
        // Filters events where end date is greater than the current timestamp
        $gt: new Date()
      }
    },
    order: 'start'
  }).then(function(results){
     res.json(results);
  }, function() {
    // Unexpected error from finding events
    res.sendStatus(500);
  });
});

// Create a new event and return event
router.post('/create', function(req, res) {
  // Check if userId was supplied and is a number
  if (!isNaN(req.body.userId)) {
    // userId was supplied and is a number
    var currentDate = new Date();
    // Check if user exists
    db.User.findOne({
      where: {
        id: +req.body.userId
      }
    }).then(function (user) {
      if (user) {
        // User exists, continue to create event
        db.Event.create({
          name: req.body.name || '',
          // If no start time specified, default to now
          start: req.body.startTime || currentDate,
          // If no end time specified, default to 24 hours from now
          end: req.body.endTime || new Date(currentDate.getTime() + 60 * 60 * 24 * 1000),
          location: req.body.location || '',
          description: req.body.description || '',
          action: req.body.action || '',
          minParticipants: req.body.minParticipants || null,
          maxParticipants: req.body.maxParticipants || null
        }).then(function(event) {
          // After creating the event, associate the event with the user as a shepherd
          user.addShepherdEvent(event).then(function(shepherdEvent) {
            event.addShepherd(user).then(function(){
              res.json(event);
            }, function() {
              // Unexpected error from adding shepherd to event
              res.sendStatus(500);
            });
          }, function() {
            // Unexpected error from adding event to the shepherd
            res.sendStatus(500);
          });
        }, function() {
          // Unexpected error from creating a new event
          res.sendStatus(500);
        });
      } else {
        // User does not exist
        res.status(400).send('User does not exist');
      }
    }, function() {
      // Unexpected error from finding a user
      res.sendStatus(500);
    });
  } else {
    // userId was not supplied or is not a number
    res.status(400).send('Invalid userId');
  }
});

// Return one specific event by eventId
router.get('/:eventId', function (req, res) {
  // Check if eventId was supplied and is a number
  if (!isNaN(req.params.eventId)) {
    // eventId was supplied and is a number
    db.Event.findOne({
      where: {
        id: +req.params.eventId
      }
    }).then(function(event) {
      res.json(event);
    }, function() {
      // Unexpected error from finding an event
      res.sendStatus(500);
    });
  } else {
    // eventId was not supplied or is not a number
    res.status(400).send('Invalid eventId');
  }
});

// Edit details for an event
router.put('/:eventId', function (req, res) {
  // Check if eventId was supplied and is a number
  if (!isNaN(req.params.eventId)) {
    // eventId was supplied and is a number
    // Find the event by ID
    db.Event.findOne({
      where: {
        id: +req.params.eventId
      }
    }).then(function(event) {
      if (event) {
        // Found event in db, continue to update
        // Selectively choose which columns to update
        event.updateAttributes({
          name: req.body.name,
          location: req.body.location,
          description: req.body.description,
          end: req.body.end,
          action: req.body.action
        }).then(function(event) {
          res.json(event);
        }, function() {
          // Unexpected error from updating event attributes
          res.sendStatus(500);
        });
      } else {
        // Event not found
        res.status(400).send('Event does not exist');
      }
    }, function() {
      // Unexpected error from finding an event
      res.sendStatus(500);
    });
  } else {
    // eventId was not supplied or is not a number
    res.status(400).send('Invalid eventId');
  }
});

// Adds a sheep and event to the SheepEvent table
router.post('/add-participant/:eventId', function (req, res) {
  // Check if eventId and userId were supplied and are numbers
  if (!isNaN(req.params.eventId) && !isNaN(req.body.id)) {
    // eventId and userId were supplied and are numbers
    // Check if user exists
    db.User.findOne({
      where: {
        id: +req.body.id
      }
    }).then(function (user) {
      if (user) {
        // User exists, check if event exists
        db.Event.findOne({
          where: {
            id: +req.params.eventId
          }
        }).then(function (event) {
          if (event) {
            // Event exists, add user to event as a sheep
            event.addSheep(user).then(function () {
              res.json(user);
            }, function() {
              // Unexpected error from adding the user to the event as a sheep
              res.sendStatus(500);
            });
          } else {
            // Event does not exist
            res.status(400).send('Event does not exist');
          }
        }, function() {
          // Unexpected error from finding an event
          res.sendStatus(500);
        });
      } else {
        // User does not exist
        res.status(400).send('User does not exist');
      }
    }, function() {
      // Unexpected error from finding a user
      res.sendStatus(500);
    });
  } else {
    // eventId or userId were not supplied or are not numbers
    res.status(400).send('Invalid eventId or userId');
  }
});

// Removes a sheep and event from the SheepEvent table
router.delete('/remove-participant/:eventId', function (req, res) {
  // Check if eventId and userId were supplied and are numbers
  if (!isNaN(req.params.eventId) && !isNaN(req.body.id)) {
    // eventId and userId were supplied and are numbers
    // Check if user exists
    db.User.findOne({
      where: {
        id: +req.body.id
      }
    }).then(function (user) {
      if (user) {
        // User exists, check if event exists
        db.Event.findOne({
          where: {
            id: +req.params.eventId
          }
        }).then(function (event) {
          if (event) {
            // Event exists, remove user from event as a sheep
            event.removeSheep(user).then(function () {
              res.json(user);
            }, function() {
              // Unexpected error from removing the user from the event as a sheep
              res.sendStatus(500);
            });
          } else {
            // Event does not exist
            res.status(400).send('Event does not exist');
          }
        }, function() {
          // Unexpected error from finding an event
          res.sendStatus(500);
        });
      } else {
        // User does not exist
        res.status(400).send('User does not exist');
      }
    }, function() {
      // Unexpected error from finding a user
      res.sendStatus(500);
    });
  } else {
    // eventId or userId were not supplied or are not numbers
    res.status(400).send('Invalid eventId or userId');
  }
});

module.exports = router;