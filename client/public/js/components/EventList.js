var React = require('react'),
    Navigation = require('react-router').Navigation,
    EventListItem = require('./EventListItem');

var EventList = React.createClass({
  mixins: [Navigation],
  
  render: function() {
    var events = this.props.events.map(function(event, i) {
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
