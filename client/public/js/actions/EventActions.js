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
  getAll: function() {
    EventAPI.getAllEvents().then(function(events) {
      AppDispatcher.dispatch({
        actionType: AppConstants.EVENT_GET,
        events: events
      });
    });
  },

  /**
   * Get all events for a specific shepherd
   * @param {number} shepherdId The primary key of the user in the database
   */
  getAllByShepherd: function(shepherdId) {
    // TODO
  },

  /**
   * Create an event
   * @param {object} data An object containing the attributes of the event
   */
  create: function(data) {
    EventAPI.addEvent(data).then(function(event) {
      AppDispatcher.dispatch(
        // Use object-assign to combine event properties with the action property
        // and dispatch the collective properties as one object
        assign({actionType: AppConstants.EVENT_CREATE}, event)
      );
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
