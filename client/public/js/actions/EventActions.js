/**
 * This is an action creator, which is a collection of methods that are called to send actions to the dispatcher.
 * This is the action creator for events that defines all the possible actions for modifying events.
 */

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    AppConstants = require('../constants/AppConstants'),
    EventAPI = require('../utils/EventAPI'),
    assign = require('object-assign');

var EventActions = {
  /**
   * Get all events
   */
  getAllEventsByShepherd: function(shepherdId) {
    console.log("inside of getAllEventsByShepherd EVENT ACTION");
    EventAPI.getAllEventsByShepherd(shepherdId).then(function(events) {
      AppDispatcher.dispatch({
        actionType: AppConstants.SHEPHERD_EVENT_GET,
        events: events
      });
    });
  },

  getAllEventsNotByShepherd:  function(shepherdId) {
    console.log("inside of getAllEventsByNotShepherd EVENT ACTION");
    EventAPI.getAllEventsNotByShepherd(shepherdId).then(function(events) {
      AppDispatcher.dispatch({
        actionType: AppConstants.NOT_SHEPHERD_EVENT_GET,
        events: events
      });
    });
  },

  /**
   * Create an event
   * @param {object} data An object containing the attributes of the event
   */
  create: function(data) {
    EventAPI.addEvent(data).then(function(event) {
      AppDispatcher.dispatch({
        actionType: AppConstants.EVENT_CREATE,
        event: event
      });
    });
  },

  // Deletes an event
  destroy: function(id) {
    AppDispatcher.dispatch({
      actionType: AppConstants.EVENT_DELETE,
      id: id
    });
  },

  /**
   * Set the current event
   * @param {object} event An object containing the attributes of the event
   */
  setCurrentEvent: function(event) {
    AppDispatcher.dispatch({
      actionType: AppConstants.UPDATE_CURRENT_EVENT,
      event: event
    });
  }
};

module.exports = EventActions;
