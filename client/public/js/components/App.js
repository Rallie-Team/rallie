var React = require('react'),
    Navigation = require('react-router').Navigation,
    RouteHandler = require('react-router').RouteHandler,
    EventStore = require('../stores/EventStore');

var getEventState = function() {
  return {
    events: EventStore.getAll()
  };
};

var App = React.createClass({
  mixins: [Navigation],

  getInitialState: function() {
    return getEventState();
  },

  componentDidMount: function() {
    EventStore.addEventListener('change', this._onChange);
  },

  componentWillUnmount: function() {
    EventStore.removeEventListener('change', this._onChange);
  },

  render: function() {
    return (
      <div>
        <header>
          <h1>Joseki</h1>
          <nav>
            <ul>
              <li><a href={this.makeHref('home')}>Home</a></li>
              <li><a href={this.makeHref('events')}>Events</a></li>
            </ul>
          </nav>
        </header>
        <div>
          {/* The RouteHandler component renders the active child route's handler */}
          <RouteHandler events={this.state.events}/>
        </div>
      </div>
    );
  },

  // Event handler for 'change' events coming from the EventStore
  _onChange: function() {
    this.setState(getEventState());
  }
});

module.exports = App;
