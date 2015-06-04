var React = require('react'),
    Navigation = require('react-router').Navigation,
    AppStore = require('../stores/AppStore'),
    EventListItem = require('./EventListItem'),
    EventStore = require('../stores/EventStore'),
    EventActions = require('../actions/EventActions'),
    cookie = require('react-cookie');

var intervalId;

var EventList = React.createClass({
  /*
    Mixins allows users to reuse code from different parts of
    the app even when their use cases are very different.

    Navigation allows us to dynamically create hrefs in the render section.

    State allows us to check what the current router state is,
    and if the user is in the event-create or event-detail routes,
    disable the button for toggling the mode.

    With the mixins property, we allow the entire React component
    to reference all the enclosed functionalities using "this".
  */
  mixins: [Navigation],

  getInitialState: function() {
    // Set initial state to the initial set of events defined in EventStore
    return {
      shepherdEvents: EventStore.getAllEventsByShepherd(cookie.load('id')),
      notShepherdEvents: EventStore.getAllEventsNotByShepherd(cookie.load('id')),
      mode: AppStore.getCurrentMode()
    };
  },

  componentDidMount: function() {
    // Add event listener for getting events from the server when the component is mounted
    // Fetching via AJAX needs to happen after mounting due to async
    EventStore.addEventListener('shepherd_events_get', this._onShepherdEvents);

   EventStore.addEventListener('not_shepherd_events_get', this._onNotShepherdEvents);

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

      // Start polling every 2 seconds for new events
      EventActions.getAllEventsNotByShepherd(cookie.load('id'));
      EventActions.getAllEventsByShepherd(cookie.load('id'));

      intervalId = setInterval(function(){
        EventActions.getAllEventsNotByShepherd(cookie.load('id'));
        EventActions.getAllEventsByShepherd(cookie.load('id'));
      }, 2000);

    }
  },

  componentWillUnmount: function() {
    // Remove event listeners when the DOM element is removed
    EventStore.addEventListener('shepherd_events_get', this._onShepherdEvents);

   EventStore.addEventListener('not_shepherd_events_get', this._onNotShepherdEvents);
    AppStore.removeEventListener('toggleMode', this._changeStateMode);
    // Remove setInterval for polling
    clearInterval(intervalId);
  },

  render: function() {
    // console.log(this.state.notShepherdEvents, 'notShepherdEvents');
    // console.log(this.state.shepherdEvents, 'shepherdEvents');
    // Sends each event to EventListItem where each event will be rendered

    if(this.state.mode === 'shepherd'){
      var events = this.state.shepherdEvents.map(function(event) {
        return <EventListItem key={event.id} event={event} mode={this.state.mode}/>
      }.bind(this));
    } else {
      var events = this.state.notShepherdEvents.map(function(event) {
        return <EventListItem key={event.id} event={event} mode={this.state.mode}/>
      }.bind(this));
    }

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

  _onShepherdEvents: function(){
    this.setState({
      shepherdEvents: EventStore.getAllEventsByShepherd()
    })
    // console.log(this.state.shepherdEvents);
  },

  _onNotShepherdEvents: function(){
    this.setState({
      notShepherdEvents: EventStore.getAllEventsNotByShepherd()
    })
    // console.log(this.state.notShepherdEvents);
  },

  // _onGet: function() {
  //   this.setState({
  //     events: getEvents()
  //   });
  // },

  // Updates the views when the state mode changes from sheep to shepherd and vice versa
  _changeStateMode: function() {
    this.setState({
      mode: AppStore.getCurrentMode()
    });
  }
});

module.exports = EventList;
