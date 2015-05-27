var EventEmitter = require('events').EventEmitter,
    assign = require('object-assign'),
    AppDispatcher = require('../dispatcher/AppDispatcher'),
    passport = require('passport-facebook'),
    AppConstants = require('../constants/AppConstants');

var _events = [{name: 'Riot at Hack Reactor', location: 'Hack Reactor HQ'}, {name: 'Flash Mob Dance Party', location: 'City Hall'}];

var EventStore = assign({}, EventEmitter.prototype, {
  getAll: function() {
    return _events;
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

    default:
      // no op
  }
});

module.exports = EventStore;
