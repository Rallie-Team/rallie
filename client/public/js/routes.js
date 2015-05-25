var React = require('react'),
    Router = require('react-router'),
    Route = Router.Route,
    DefaultRoute = Router.DefaultRoute;

var App = require('./components/App'),
    EventList = require('./components/EventList');

var routes = (
  <Route handler={App}>
    <Route name="events" handler={EventList}/>
  </Route>
);

module.exports = routes;
