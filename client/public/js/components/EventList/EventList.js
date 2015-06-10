var React = require('react'),
    Navigation = require('react-router').Navigation,
    AppStore = require('../../stores/AppStore'),
    EventListItem = require('./EventListItem'),
    EventStore = require('../../stores/EventStore'),
    EventActions = require('../../actions/EventActions'),
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
      shepherdEvents: EventStore.getAllEventsByShepherd(),
      sheepEvents: EventStore.getAllEventsBySheep(),
      notShepherdEvents: EventStore.getAllEventsNotByShepherd(),
      mode: AppStore.getCurrentMode()
    };
  },

  componentDidMount: function() {
    // Add event listeners for getting events from the server when the component is mounted
    // Fetching via AJAX needs to happen after mounting due to async
    EventStore.addEventListener('shepherd_events_get', this._onShepherdEvents);
    EventStore.addEventListener('sheep_events_get', this._onSheepEvents);
    EventStore.addEventListener('not_shepherd_events_get', this._onNotShepherdEvents);

    // Add event listener to get the current mode when the mode changes
    // For the EventList component, the create event button should only be
    // available when the mode is sherpherd.
    AppStore.addEventListener('toggleMode', this._changeStateMode);

    if (this.isMounted()) {
      EventActions.getAllEventsByShepherd(cookie.load('id'));

      // Start polling every 2 seconds for new events
      intervalId = setInterval(function(){
        EventActions.getAllEventsByShepherd(cookie.load('id'));
        EventActions.getAllEventsBySheep(cookie.load('id'));
        EventActions.getAllEventsNotByShepherd();
      }, 2000);

    }
  },

  componentWillUnmount: function() {
    // Remove event listeners when the DOM element is removed
    EventStore.removeEventListener('shepherd_events_get', this._onShepherdEvents);
    EventStore.removeEventListener('sheep_events_get', this._onSheepEvents);
    EventStore.removeEventListener('not_shepherd_events_get', this._onNotShepherdEvents);
    AppStore.removeEventListener('toggleMode', this._changeStateMode);
    // Remove setInterval for polling
    clearInterval(intervalId);
  },

  render: function() {
    // Sends each event to EventListItem where each event will be rendered

    if (this.state.mode === 'shepherd') {
      var events = this.state.shepherdEvents.map(function(event) {
        return <EventListItem key={event.id} event={event} mode={this.state.mode}/>
      }.bind(this));
    } else {
      var events = this.state.notShepherdEvents.map(function(event) {
        return <EventListItem key={event.id} event={event} mode={this.state.mode} isParticipating={this._isParticipating(event.id)}/>
      }.bind(this));
    }

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

  // TODO: Add this functionality to show participants on the home screen
  _onSheepEvents: function(){
    this.setState({
      sheepEvents: EventStore.getAllEventsBySheep()
    })
    // console.log(this.state.sheepEvents);
  },

  _onNotShepherdEvents: function(){
    this.setState({
      notShepherdEvents: EventStore.getAllEventsNotByShepherd()
    })
    // console.log(this.state.notShepherdEvents);
  },

  // Updates the views when the state mode changes from sheep to shepherd and vice versa
  _changeStateMode: function() {
    this.setState({
      mode: AppStore.getCurrentMode()
    });
  },

  _isParticipating: function(eventId) {
    var sheepEvents = this.state.sheepEvents;
    var totalSheepEvents = sheepEvents.length;
    for (var i = 0; i < totalSheepEvents; i++) {
      if (sheepEvents[i].id === eventId) return true;
    }
    return false;
  }
});

module.exports = EventList;
