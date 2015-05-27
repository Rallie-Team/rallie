var React = require('react'),
    Navigation = require('react-router').Navigation,
    EventListItem = require('./EventListItem'),
    EventStore = require('../stores/EventStore');

//Gets all of the events presently stored and sets it to
//state.events
var getEventState = function() {
  return {
    events: EventStore.getAll()
  };
};

var EventList = React.createClass({
//mixins allows users to reuse code from different parts of
//the app even when their use cases are very different
//Navigation allows us to dynamically create hrefs in the render
//section.  Inside of mixin, we allow the entire react component
//to reference the functionalities using "this"
  mixins: [Navigation],

  getInitialState: function() {
    return getEventState();
  },

  render: function() {
    //referenced the states created in getEventState
    //sends each event to EventListItem so that it will be properly
    //displayed
    var events = this.state.events.map(function(event, i) {
      return <EventListItem key={i} event={event}/>
    });

    //this.props.mode references the mode set in App.js
    //this checks to see if the user is a shepherd and only allows
    //the create button to appear is that is true
    return (
      <div className="event-list">
        <h2>Events</h2>
        { this.props.mode === 'shepherd' ?
        <div className="event-create-button">
          <a href={this.makeHref('event-create')}>Create Event</a>
        </div> : null
        }
        {events}
      </div>
    );
  }
});

module.exports = EventList;
