var React = require('react'),
    Router = require('react-router'),
    Route = Router.Route,
    Redirect = Router.Redirect,
    App = require('./components/App'),
    EventList = require('./components/EventList/EventList'),
    EventCreate = require('./components/EventDetail/EventCreate'),
    EventDetail = require('./components/EventDetail/EventDetail'),
    Contact = require('./components/Contact/Contact'),
    Team = require('./components/Team/Team');

//routes show that App is the parent of EventList and EventCreate
//App will always be rendered and will determine which/if EventList
//and EventCreate is showed
//The children routes have access to the "states" of App which are referred
//to as "props" in EventList and EventCreate
var routes = (
  <Route name="home" handler={App} path="/">
    <Route name="events" handler={EventList} path="events"/>
    <Route name="event-create" handler={EventCreate} path="events/create"/>
    <Route name="event-detail" handler={EventDetail} path="events/detail/:eventId"/>
    <Route name="contact" handler={Contact} path="contact"/>
    <Route name="team" handler={Team} path="team"/>
    <Redirect from="_=_" to="events"/>
  </Route>
);

module.exports = routes;