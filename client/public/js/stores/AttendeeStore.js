var EventEmitter = require('events').EventEmitter,
    assign = require('object-assign'),
    AppDispatcher = require('../dispatcher/AppDispatcher'),
    AppConstants = require('../constants/AppConstants');

var _attendees = [];

var AttendeeStore = assign({}, EventEmitter.prototype, {
  getAll: function() {
    return _attendees;
  },

  /**
   * Trigger an attendees
   * @param {string} attendeeName The name of the attendee
   */
  emitEvent: function(attendeeName) {
    this.emit(attendeeName);
  },

  /**
   * Register a callback to invoke when an attendees is triggered
   * @param {string} attendeeName The name of the attendees
   * @param {function} callback The callback function to invoke when the attendees is triggered
   */
  addEventListener: function(attendeeName, callback) {
    this.on(attendeeName, callback);
  },

  /**
   * Prattendees a callback from being invoked when an attendees is triggered
   * @param {string} attendeeName The name of the attendees
   * @param {function} callback Stops the callback function from being invoked when the attendees is triggered
   */
  removeEventListener: function(attendeeName, callback) {
    this.removeListener(attendeeName, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(payload) {
  switch(payload.actionType) {
    // When attendees are fetched
    case AppConstants.ATTENDEES_GET:
      // Set current attendees collection to the fetched results
      _attendees = [];
      for(var i = 0; i < payload.attendees.length; i ++){
        _attendees.push(payload.attendees[i].username);
      }
      console.log(_attendees, '--------------------------');
      AttendeeStore.emitEvent('aquiredShepherds');
      break;

    default:
      // no op
  }
});

module.exports = AttendeeStore;
