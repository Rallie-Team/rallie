var EventEmitter = require('events').EventEmitter,
    assign = require('object-assign'),
    AppDispatcher = require('../dispatcher/AppDispatcher'),
    AppConstants = require('../constants/AppConstants');

var _currentEvent = {name: '', location: '', action: ''};
var _isAttendee = false;
var _currentUserId = 0;
var _observations = [];

/**
 * Check if the sheep is an attendee
 */
var checkSheep = function(sheeps, currentSheepId) {
  for (var i = 0; i < sheeps.length; i++) {
    if (sheeps[i]['id'] === currentSheepId) {
      return true;
    }
  }
  return false;
};

var EventDetailStore = assign({}, EventEmitter.prototype, {
  getCurrentEvent: function() {
    return _currentEvent;
  },

  isAttendee: function() {
    return _isAttendee;
  },

  getAllObservations: function() {
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

    // Set the current event from data coming from the payload
    // then emit an edit event from EventDetailStore which will update
    // any components listening to it
    case AppConstants.EVENT_EDIT:
      _currentEvent = payload.event;
      EventDetailStore.emitEvent('edit');
      break;

    // Set the current event
    case AppConstants.UPDATE_CURRENT_EVENT:
      _currentEvent = payload.event;
      EventDetailStore.emitEvent('updateCurrentEvent');
      break;

    case AppConstants.EVENT_SHEEP_ATTEND:
      _isAttendee = payload.attendee;
      EventDetailStore.emitEvent('attend');
      break;

    case AppConstants.SHEEPS_GET:
      _isAttendee = checkSheep(payload.sheeps, _currentUserId);
      EventDetailStore.emitEvent('attend');
      break;

    case AppConstants.SET_CURRENT_USER:
      _currentUserId = payload.user.id;
      break;


    default:
      // no op
  }
});

module.exports = EventDetailStore;
