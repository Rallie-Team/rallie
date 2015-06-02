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
