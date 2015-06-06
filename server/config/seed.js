// TODO: Eddie here is a location to load seed data
  return orm.sync({force:true}).then(function(){

    User.bulkCreate([
      { username: 'steven', facebook_id: 123},
      { username: 'derek', facebook_id: 124},
      { username: 'kevin', facebook_id: 125},
      { username: 'eddie', facebook_id: 126}
    ]);


    Event.bulkCreate([
      { name: 'thing1', start: 'June 17, 2015 13:00:00', end: 'June 17, 2015 14:00:00', location: 'San Francisco', minParticipants: 0, maxParticipants: 4, action:''},
      { name: 'thing2', start: 'June 17, 2015 13:00:00', end: 'June 17, 2015 14:00:00', location: 'San Francisco', minParticipants: 0, maxParticipants: 4, action:'' },
      { name: 'thing3', start: 'June 17, 2015 13:00:00', end: 'June 17, 2015 14:00:00', location: 'San Francisco', minParticipants: 0, maxParticipants: 4, action:'' },
      { name: 'thing4', start: 'June 17, 2015 13:00:00', end: 'June 17, 2015 14:00:00', location: 'San Francisco', minParticipants: 0, maxParticipants: 4, action:'' },
      { name: 'thing5', start: 'June 17, 2015 13:00:00', end: 'June 17, 2015 14:00:00', location: 'San Francisco', minParticipants: 0, maxParticipants: 4, action:'' }
    ]);

    Observation.bulkCreate([
      {content: 'yes1', completed: false, rawImage: ''},
      {content: 'yes2', completed: false, rawImage: ''},
      {content: 'yes3', completed: false, rawImage: ''},
      {content: 'yes4', completed: false, rawImage: ''},
      {content: 'yes5', completed: false, rawImage: ''}
    ]);



  var user1;
  var event1;
  var observation1;

  User.findOne({
    where: {
    id: 1
  }
  }).then(function (user) {
    user1 = user;
    console.log(user1);
    Event.findOne({
      where: {
      id: 1
      }
    }).then(function (event) {
      event1 = event;
      console.log(event1);
      Observation.findOne({
        where: {
          id:1
        }
      }).then(function(observation){
        observation1 = observation;
      });
    });
  });

  var user2;
  var event2;
  var observation2;

  User.findOne({
    where: {
    id: 2
  }
  }).then(function (user) {
    user2 = user;
    Event.findOne({
      where: {
      id: 2
      }
    }).then(function (event) {
      event2 = event;
      Observation.findOne({
        where: {
          id: 2
        }
      }).then(function(observation){
        observation2 = observation;
      });
    });
  });

  var user3;
  var event3;
  var observation3;

  User.findOne({
    where: {
    id: 3
  }
  }).then(function (user) {
    user3 = user;
    Event.findOne({
      where: {
      id: 3
      }
    }).then(function (event) {
      event3 = event;
      Observation.findOne({
        where: {
          id:3
        }
      }).then(function(observation){
        observation3 = observation;
      });
    });
  });

  var user4;
  var event4;
  var observation4;

  User.findOne({
    where: {
    id: 4
  }
  }).then(function (user) {
    user4 = user;
    Event.findOne({
      where: {
      id: 4
      }
    }).then(function (event) {
      event4 = event;
      Observation.findOne({
        where: {
          id:4
        }
      }).then(function(observation){
        observation4 = observation;


        user1.addObservation(observation1);
        event1.addObservation(observation1);
        user2.addObservation(observation2);
        event1.addObservation(observation2);

        user1.addObservation(observation1);
        event2.addObservation(observation1);
        user1.addObservation(observation3);
        event2.addObservation(observation3);

        user2.addObservation(observation2);
        event2.addObservation(observation2);
        user3.addObservation(observation2);
        event2.addObservation(observation2);

        user1.addShepherdEvent(event1);
        user1.addShepherdEvent(event2);
        user1.addShepherdEvent(event3);
        user1.addShepherdEvent(event4);

        user1.addSheepEvent(event2);
        user3.addSheepEvent(event2);
        user4.addSheepEvent(event2);

        user2.addSheepEvent(event1);
        user3.addSheepEvent(event2);
        user4.addSheepEvent(event2);


      });
    });
  });