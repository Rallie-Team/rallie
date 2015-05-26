var React = require('react'),
    Router = require('react-router'),
    Route = Router.Route,
    DefaultRoute = Router.DefaultRoute,
    App = require('./components/App'),
    EventList = require('./components/EventList'),
    EventCreate = require('./components/EventCreate');

var routes = (
  <Route name="home" handler={App} path="/">
    <Route name="events" handler={EventList} path="events"/>
    <Route name="event-create" handler={EventCreate} path="events/create"/>
  </Route>
);

module.exports = routes;
