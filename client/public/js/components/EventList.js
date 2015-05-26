var React = require('react'),
    Navigation = require('react-router').Navigation,
    EventListItem = require('./EventListItem'),
    EventStore = require('../stores/EventStore');

var getEventState = function() {
  return {
    events: EventStore.getAll()
  };
};

var EventList = React.createClass({
  mixins: [Navigation],

  getInitialState: function() {
    return getEventState();
  },
  
  render: function() {
    var events = this.state.events.map(function(event, i) {
      return <EventListItem key={i} event={event}/>
    });

    return (
      <div className="event-list">
        <h2>Events</h2>
        <div className="event-create-button">
          <a href={this.makeHref('event-create')}>Create Event</a>
        </div>
        {events}
      </div>
    );
  }
});

module.exports = EventList;
