var EventEmitter = require('events').EventEmitter,
    assign = require('object-assign'),
    AppDispatcher = require('../dispatcher/AppDispatcher'),
    AppConstants = require('../constants/AppConstants');

var _observations = [];

var ObservationStore = assign({}, EventEmitter.prototype, {
  getAll: function() {
    return _observations;
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
  switch(payload.actionType) {
    // When observations are fetched
    case AppConstants.OBSERVATION_GET:
      // Set current observations collection to the fetched results
      _observations = payload.observations;
      ObservationStore.emitEvent('get');
      break;

    // When an observation is created
    case AppConstants.OBSERVATION_CREATE:
      // Add the new observation to the current collection of observations
      _observations.unshift(payload.observations[0]);
      ObservationStore.emitEvent('create');
      break;

    default:
      // no op
  }
});

module.exports = ObservationStore;
