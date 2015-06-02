var router = require('express').Router();
var db = require('../../db');

// Return a collection of observations selected corresponding to an eventId
router.get('/:eventId', function(req, res) {
  db.Event.findOne({where: {id: req.params.eventId}})
  .then(function(event){
    return event.getShepherds();
  })
  .then(function(shepherds){
    res.json(shepherds);
  });

//   db.ShepherdEvent.findAll({
//     where: {
//       EventId: req.params.eventId
//     },
//     include: {
//       model: db.User
//     },
//     order: 'id DESC'
//   }).then(function(data) {
//     console.log(data);
//   });
});


module.exports = router;