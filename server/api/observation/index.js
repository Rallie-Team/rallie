var router = require('express').Router();
var db = require('../../db');

// Return a collection of observations selected corresponding to an eventId
router.get('/:eventId', function(req, res) {
  db.Observation.findAll({
    where: {
      EventId: req.params.eventId
    },
    include: {
      model: db.User
    },
    order: 'id DESC'
  }).then(function(event) {
    res.json(event);
  });
});

// Create a new observation and return it
router.post('/create', function(req, res) {
 // Create and add the observation to the db
 db.Observation.create({
   content: req.body.content || '',
   completed: req.body.completed || false,
   rawImage: req.body.rawImage || undefined,
   UserId: req.body.userId,
   EventId: req.body.eventId
 }).then(function(observation){
    //Find the event to which the observation belongs to
    db.Event.findOne({
      where: {
        id: req.body.eventId
      }
    }).then(function(event){
      //Associate the observation with that event
      event.addObservation(observation);
      //Find the user that made the observation
      db.User.findOne({
        where: {
          id: req.body.userId
        }
      }).then(function(user){
        //Associate the observation with that user
        user.addObservation(observation).then(function(observation) {
          user.getObservations({
            where: {
              id: observation.id,
            },
            include: {
              model: db.User
            }
          }).then(function(observation) {
            // console.log(JSON.stringify(observation), '-------------------------');
            res.json(observation);
          });
        });
      });
    });
  });
});

module.exports = router;