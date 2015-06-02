var router = require('express').Router();
var db = require('../../db');

// Return a collection of observations selected corresponding to an eventId
router.get('/shepherd/:eventId', function(req, res) {
  db.Event.findOne({where: {id: req.params.eventId}})
  .then(function(event){
    return event.getShepherds();
  })
  .then(function(shepherds){
    res.json(shepherds);
  });
});

router.get('/sheep/:eventId', function(req, res) {
  db.Event.findOne({where: {id: req.params.eventId}})
  .then(function(event){
    return event.getSheeps();
  })
  .then(function(sheeps){
    res.json(sheeps);
  });
});


module.exports = router;