var EventEmitter = require('events').EventEmitter,
    assign = require('object-assign'),
    AppDispatcher = require('../dispatcher/AppDispatcher'),
    passport = require('passport-facebook'),
    AppConstants = require('../constants/AppConstants');

// var _events = [{name: 'Riot at Hack Reactor', location: 'Hack Reactor HQ'}, {name: 'Flash Mob Dance Party', location: 'City Hall'}];
var _events = [];
var _currentEvent = {name: '', location: ''};

var EventStore = assign({}, EventEmitter.prototype, {
  getAll: function() {
    return _events;
  },

  getCurrentEvent: function() {
    return _currentEvent;
  },

  /**
   * Trigger an event
   * @param {string} eventName The name of the event
   */
  emitEvent: function(eventName) {
    this.emit(eventName);
  },

  /**
   * Register a callback to invoke when an event is triggered
   * @param {string} eventName The name of the event
   * @param {function} callback The callback function to invoke when the event is triggered
   */
  addEventListener: function(eventName, callback) {
    this.on(eventName, callback);
  },

  /**
   * Prevent a callback from being invoked when an event is triggered
   * @param {string} eventName The name of the event
   * @param {function} callback Stops the callback function from being invoked when the event is triggered
   */
  removeEventListener: function(eventName, callback) {
    this.removeListener(eventName, callback);
  }

});


// Register callback to handle all updates
AppDispatcher.register(function(payload) {
  switch(payload.action) {
    // When events are fetched
    case AppConstants.EVENT_GET:
      // Set current events collection to the fetched results
      _events = payload.events;
      EventStore.emitEvent('get');
      break;

    // TODO: NEED TO IMPLEMENT HANDLER FOR CREATING EVENTS
    case AppConstants.EVENT_CREATE:
      // Optimistically add new event to the collection of events before POSTing to the server
      _events.push({name: payload.name, location: payload.location});

      // TODO: CALL SERVER TO CREATE NEW EVENT IN DB AND THEN INVOKE EventStore.emitEvent('create') ON SUCCESS
      EventStore.emitEvent('create');
      // TODO: DO SOMETHING ELSE IF THERE WAS AN ERROR DURING EVENT CREATION
      break;

    // TODO: NEED TO IMPLEMENT HANDLER FOR DELETING EVENTS
    case AppConstants.EVENT_DELETE:
      EventStore.emitEvent('delete');
      break;

    case AppConstants.UPDATE_STATE:
      _currentEvent = payload.state;
      EventStore.emitEvent('update');
      break;

    // case AppConstants.LOCATION_EDIT:
    //   _currentEvent.location = payload.location
      // for(var i = 0; i < _events.length; i ++){
      //   console.log(_events[i].name, 'sdfdsfsadfdsad');
      //   console.log(payload);
      //   if(_events[i].name === payload.name){
      //     _events[i].location = payload.location;
      //     console.log(_events);
      //   }
      // }
      // EventStore.emitEvent('edit');
      // break;

    //Sets location and name property to currentEvent
    //which is then emits an edit event to Event Store which
    //will update the view.
    case AppConstants.EVENT_EDIT:
      _currentEvent.location = payload.location;
      _currentEvent.name = payload.name;
      // console.log(_currentEvent);
      EventStore.emitEvent('edit');
      break;

    default:
      // no op
  }
});

module.exports = EventStore;
