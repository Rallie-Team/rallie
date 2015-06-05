var router = require('express').Router();
var db = require('../../db');

// Return a collection of observations selected corresponding to an eventId
router.get('/:eventId', function(req, res) {
  if (!isNaN(req.params.eventId)) {
    // eventId is a number
    db.Observation.findAll({
      where: {
        EventId: +req.params.eventId
      },
      include: {
        model: db.User
      },
      order: 'id DESC'
    }).then(function(observations) {
      res.json(observations);
    });
  } else {
    // eventId is not a number
    res.sendStatus(400);
  }
});

// Create a new observation and return it
router.post('/create', function(req, res) {
  // Check if userId and eventId exist and are numbers
  if (req.body.userId && !isNaN(req.body.userId) && req.body.eventId && !isNaN(req.body.eventId)) {
    // userId and eventId exist and are numbers
    // Check if user exists
    db.User.findOne({
      where: {
        id: +req.body.userId
      }
    }).then(function(user) {
      if (user) {
        // User exists, check if event exists
        db.Event.findOne({
          where: {
            id: +req.body.eventId
          }
        }).then(function(event) {
          if (event) {
            // Event exists, create observation
            db.Observation.create({
              content: req.body.content || '',
              completed: req.body.completed || false,
              rawImage: req.body.rawImage || undefined
            }).then(function(observation) {
              // Associate user to observation
              return user.addObservation(observation);
            }).then(function(observation) {
              // Associate event to observation
              return event.addObservation(observation);
            }).then(function(observation) {
              res.json(observation);
            });
          } else {
            // Event does not exist
            res.status(400).send('Invalid event');
          }
        });
      } else {
        // User does not exist
        res.status(400).send('Invalid user');
      }
    });
  } else {
    // No valid userId or eventId
    res.status(400).send('No userId or eventId provided');
  }
});

module.exports = router;