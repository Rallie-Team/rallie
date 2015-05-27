var React = require('react'),
    Router = require('react-router'),
    Route = Router.Route,
    DefaultRoute = Router.DefaultRoute,
    App = require('./components/App'),
    EventList = require('./components/EventList'),
    EventCreate = require('./components/EventCreate');

//routes show that App is the parent of EventList and EventCreate
//App will always be rendered and will determine which/if EventList
//and EventCreate is showed
//The children routes have access to the "states" of App which are referred
//to as "props" in EventList and EventCreate
var routes = (
  <Route name="home" handler={App} path="/">
    <Route name="events" handler={EventList} path="events"/>
    <Route name="event-create" handler={EventCreate} path="events/create"/>
  </Route>
);

module.exports = routes;
