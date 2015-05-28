var EventEmitter = require('events').EventEmitter,
    assign = require('object-assign'),
    AppDispatcher = require('../dispatcher/AppDispatcher'),
    AppConstants = require('../constants/AppConstants');

var _observations = [{name: 'Steven', text: 'I am happy'}, {name: 'Kevin', text: 'hi'}];
var _currentUser = {id: '123', name: 'Eddie'};
var EventDetailStore = assign({}, EventEmitter.prototype, {
  getAllObservations: function() {
    return _observations;
  },

  getCurrentUser: function() {
    return _currentUser.name;
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

    // TODO: NEED TO IMPLEMENT HANDLER FOR DELETING EVENTS
    case AppConstants.EVENT_EDIT:
      EventDetailStore.emitEvent('edit');
      break;

    // TODO: IMPLEMENT OTHER HANDLERS FOR EVENTS
    case AppConstants.OBSERVATION_CREATE:
      _observations.push(payload.observation);
      EventDetailStore.emitEvent('create');
    default:
      // no op
  }
});

module.exports = EventDetailStore;
