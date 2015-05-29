/**
 * This is an action creator, which is a collection of methods that are called to send actions to the dispatcher.
 * This is the action creator for events that defines all the possible actions for modifying events.
 */

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    AppConstants = require('../constants/AppConstants'),
    EventAPI = require('../utils/EventAPI');

var EventActions = {
  // Get all events
  getAll: function() {
    EventAPI.getAllEvents().then(function(events) {
      AppDispatcher.dispatch({
        action: AppConstants.EVENT_GET,
        events: events
      });
    });
  },

  // Get all events for a specific shepherd

  // Creates an event
  create: function(data) {
    EventAPI.addEvent(data).then(function(event) {
      AppDispatcher.dispatch({
        action: AppConstants.EVENT_CREATE,
        name: event.eventName,
        location: event.location
      });
    });
  },

  // Deletes an event
  destroy: function(id) {
    AppDispatcher.dispatch({
      action: AppConstants.EVENT_DELETE,
      id: id
    });
  },

  prepareForSegue: function(state){
    AppDispatcher.dispatch({
      action: AppConstants.UPDATE_STATE,
      state: state
    });
  }
};

module.exports = EventActions;
