var router = require('express').Router();
var db = require('../../db');

// Return an array of shepherds. These are the user objects
router.get('/shepherd/:eventId', function(req, res) {
  db.Event.findOne({where: {id: req.params.eventId}})
  .then(function(event){
    return event.getShepherds();
  })
  .then(function(shepherds){
    res.json(shepherds);
  });
});

// Return an array of sheep. These are the user objects
router.get('/sheep/:eventId', function(req, res) {
  db.Event.findOne({where: {id: req.params.eventId}})
  .then(function(event){
    return event.getSheep();
  })
  .then(function(sheeps){
    res.json(sheeps);
  });
});

module.exports = router;
