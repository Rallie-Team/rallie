var React = require('react'),
    Navigation = require('react-router').Navigation,
    EventListItem = require('./EventListItem'),
    EventStore = require('../stores/EventStore'),
    EventActions = require('../actions/EventActions');

var getEvents = function() {
  return EventStore.getAll();
};

var EventList = React.createClass({
//mixins allows users to reuse code from different parts of
//the app even when their use cases are very different
//Navigation allows us to dynamically create hrefs in the render
//section.  Inside of mixin, we allow the entire react component
//to reference the functionalities using "this"
  mixins: [Navigation],

  getInitialState: function() {
    // Set initial state to the initial set of events defined in EventStore
    return {
      events: getEvents()
    };
  },

  // Fetch all events after component is mounted
  // Fetching via AJAX needs to happen after mounting due to async
  componentDidMount: function() {
    // Add event listener for getting events from the server when the component is mounted
    EventStore.addEventListener('get', this._onGet);

    if (this.isMounted()) {
      // TODO: REFACTOR TO GET ALL EVENTS BY USERID FOR A SHEPHERD
      // WE NEED TO PASS THE USER MODE DOWN TO THIS REACT COMPONENT
      // SO THAT WE CAN DISTINGUISH WHETHER TO GET ALL EVENTS (FOR SHEEP)
      // OR GET ALL EVENTS BY USERID (FOR A SHEPHERD)

      // Get all events (for sheep)
      EventActions.getAll();
    }
  },

  componentWillUnmount: function() {
    // Remove event listener when the DOM element is removed
    EventStore.removeEventListener('get', this._onGet);
  },

  render: function() {
    //referenced the states created in getEventState
    //sends each event to EventListItem so that it will be properly
    //displayed
    var mode = this.props.mode;
    var events = this.state.events.map(function(event, i) {
      return <EventListItem key={i} event={event} mode={mode}/>
    });

    //this.props.mode references the mode set in App.js which is made
    //possible because Event List is a child Route of App.js
    //Please reference routes.js
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
  },

  _onGet: function() {
    this.setState({
      events: getEvents()
    });
  }
});

module.exports = EventList;
