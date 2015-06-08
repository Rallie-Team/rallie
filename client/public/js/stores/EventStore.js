var EventEmitter = require('events').EventEmitter,
    assign = require('object-assign'),
    AppDispatcher = require('../dispatcher/AppDispatcher'),
    AppConstants = require('../constants/AppConstants');

var _shepherdEvents = [];
var _sheepEvents = [];
var _notShepherdEvents = [];
var _shepherdEventsIds = [];
var _currentEvent = {name: '', location: '', attendee: false};

var EventStore = assign({}, EventEmitter.prototype, {
  getAllEventsByShepherd: function() {
    return _shepherdEvents;
  },

  getAllEventsBySheep: function() {
    return _sheepEvents;
  },

  getAllEventsNotByShepherd: function(){
    return _notShepherdEvents;
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


AppDispatcher.register(function(payload) {
  switch(payload.actionType) {

    case AppConstants.SHEPHERD_EVENT_GET:
      _shepherdEvents = payload.events;
      // Cache shepherd eventId's in a local array
      _shepherdEventsIds = [];
      for(var i = 0; i < _shepherdEvents.length; i++){
        _shepherdEventsIds.push(_shepherdEvents[i].id);
      }
      EventStore.emitEvent('shepherd_events_get');
      break;

    case AppConstants.SHEEP_EVENT_GET:
      _sheepEvents = payload.events;
      EventStore.emitEvent('sheep_events_get');
      break;

    case AppConstants.NOT_SHEPHERD_EVENT_GET:
      _notShepherdEvents = [];
      for (var i = 0; i < payload.events.length; i++) {
        if (_shepherdEventsIds.indexOf(payload.events[i].id) < 0){
          _notShepherdEvents.push(payload.events[i]);
        }
      }
      EventStore.emitEvent('not_shepherd_events_get');
      break;

    case AppConstants.EVENT_CREATE:
      // Add new event to the current collection of events
      _shepherdEvents.push(payload.event);
      EventStore.emitEvent('create');
      // TODO: DO SOMETHING ELSE IF THERE WAS AN ERROR DURING EVENT CREATION
      break;

    // TODO: NEED TO IMPLEMENT HANDLER FOR DELETING EVENTS
    case AppConstants.EVENT_DELETE:
      EventStore.emitEvent('delete');
      break;

    // Eagerly add or remove event from _sheepEvents
    // When participating or leaving an event from the event detail page,
    // it should update _sheepEvents so that the event list page will accurately
    // display which events the user is participating in without having to wait to
    // poll the database
    case AppConstants.EVENT_SHEEP_ATTEND:
      if (payload.attendee) {
        _sheepEvents.push(payload.event);
      } else {
        var totalSheepEvents = _sheepEvents.length;
        for (var i = 0; i < totalSheepEvents; i++) {
          if (_sheepEvents[i].id === payload.event.id) {
            _sheepEvents.splice(i, 1);
            break;
          }
        }
      }
      break;

    default:
      // no op
  }
});

module.exports = EventStore;
