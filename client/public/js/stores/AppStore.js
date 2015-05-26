var EventEmitter = require('events').EventEmitter,
    assign = require('object-assign'),
    AppDispatcher = require('../dispatcher/AppDispatcher'),
    AppConstants = require('../constants/AppConstants'),
    AppActions = require('../actions/AppActions');

var AppStore = assign({}, EventEmitter.prototype, {
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
    case AppConstants.TOGGLE_MODE:
      // CALL AppActionCreators to talk to API

      AppStore.emitEvent('toggleMode');
      // TODO: DO SOMETHING ELSE IF THERE WAS AN ERROR DURING EVENT CREATION
      break;

    default:
      // no op
  }
});

module.exports = AppStore;
