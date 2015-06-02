var React = require('react'),
    Navigation = require('react-router').Navigation,
    AppStore = require('../stores/AppStore'),
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
      events: getEvents(),
      mode: AppStore.getCurrentMode()
    };
  },

  componentDidMount: function() {
    // Add event listener for getting events from the server when the component is mounted
    // Fetching via AJAX needs to happen after mounting due to async
    EventStore.addEventListener('get', this._onGet);

    // Add event listener to get the current mode when the mode changes
    // For the EventList component, the create event button should only be 
    // available when the mode is sherpherd.
    AppStore.addEventListener('toggleMode', this._changeStateMode);

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
    // Remove event listeners when the DOM element is removed
    EventStore.removeEventListener('get', this._onGet);
    AppStore.removeEventListener('toggleMode', this._changeStateMode);

  },

  render: function() {
    // Sends each event to EventListItem where each event will be rendered
    var events = this.state.events.map(function(event) {
      return <EventListItem key={event.id} event={event} mode={this.state.mode}/>
    }.bind(this));

    // this.state.mode references the mode set in AppStore.js
    // The event create button only appears if the current mode
    // is shepherd
    return (
      <div className="event-list">
        <h2>Events</h2>
        { this.state.mode === 'shepherd' ?
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
  },

  // Updates the views when the state mode changes from sheep to shepherd and vice versa
  _changeStateMode: function() {
    this.setState({
      mode: AppStore.getCurrentMode()
    });
  }
});

module.exports = EventList;
