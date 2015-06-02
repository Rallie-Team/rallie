var EventEmitter = require('events').EventEmitter,
    assign = require('object-assign'),
    AppDispatcher = require('../dispatcher/AppDispatcher'),
    AppConstants = require('../constants/AppConstants');

var _sheeps = [];
var _shepherds = [];

var AttendeeStore = assign({}, EventEmitter.prototype, {
  getAllSheep: function() {
    return _sheeps;
  },

  getAllShepherd: function() {
    return _shepherds;
  },

  /**
   * Trigger an sheep
   * @param {string} attendeeName The name of the attendee
   */
  emitEvent: function(attendeeName) {
    this.emit(attendeeName);
  },

  /**
   * Register a callback to invoke when an sheep is triggered
   * @param {string} attendeeName The name of the sheep
   * @param {function} callback The callback function to invoke when the sheep is triggered
   */
  addEventListener: function(attendeeName, callback) {
    this.on(attendeeName, callback);
  },

  /**
   * Prsheep a callback from being invoked when an sheep is triggered
   * @param {string} attendeeName The name of the sheep
   * @param {function} callback Stops the callback function from being invoked when the sheep is triggered
   */
  removeEventListener: function(attendeeName, callback) {
    this.removeListener(attendeeName, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(payload) {
  switch(payload.actionType) {
    // When sheep are fetched
    case AppConstants.SHEPHERD_GET:
      // Set current sheep collection to the fetched results
      _shepherd = payload.shepherds;
      AttendeeStore.emitEvent('aquiredShepherds');
      break;

    case AppConstants.SHEEP_GET:
      // Set current sheep collection to the fetched results
      _sheep = payload.sheeps;
      AttendeeStore.emitEvent('aquiredSheep');
      break;

    default:
      // no op
  }
});

module.exports = AttendeeStore;
