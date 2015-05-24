var React = require('react'),
    EventListItem = require('./EventListItem');

var EventList = React.createClass({
  render: function() {
    var events = this.props.events.map(function(event, i) {
      return <EventListItem key={i} event={event}/>
    });

    return (
      <div className="event-list">
        <h2>Events</h2>
        {events}
      </div>
    );
  }
});

module.exports = EventList;
