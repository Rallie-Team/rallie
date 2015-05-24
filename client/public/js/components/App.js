var React = require('react'),
    RouteHandler = require('react-router').RouteHandler,
    EventStore = require('../stores/EventStore');

var getEventState = function() {
  return {
    events: EventStore.getAll()
  };
};

var App = React.createClass({
  getInitialState: function() {
    return getEventState();
  },

  componentDidMount: function() {
    EventStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    EventStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div>
        <header>
          <h1>Joseki</h1>
          <nav>
            <ul>
              <li><a href="/#/">Home</a></li>
              <li><a href="/#/events">Events</a></li>
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
