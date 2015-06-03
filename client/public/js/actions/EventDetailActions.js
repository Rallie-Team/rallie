/**
 * This is an action creator, which is a collection of methods that are called to send actions to the dispatcher.
 * This is the action creator for an event that defines all the possible actions for an events.
 */

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    AppConstants = require('../constants/AppConstants'),
    EventAPI = require('../utils/EventAPI');

var EventDetailActions = {
  /**
   * Get a specific event
   * @param {number} eventId The primary key of the event in the database
   */
   get: function(eventId) {
    EventAPI.getEvent(eventId).then(function(event) {
      AppDispatcher.dispatch({
        actionType: AppConstants.UPDATE_CURRENT_EVENT,
        event: event
      });
    });
   },

   /**
   * Edit and update event details
   * @param {object} event An updated representation of the event attributes
   */
  edit: function(event) {
    EventAPI.editEvent(event).then(function(event) {
      AppDispatcher.dispatch({
        actionType: AppConstants.EVENT_EDIT,
        event: event
      });
    });
  },

  /**
   * Attend the event as a sheep
   */
  attend: function (event, user, attending) {
    if (attending) {
      EventAPI.addParticipant(event, user).then(function (user) {
        AppDispatcher.dispatch({
          actionType: AppConstants.EVENT_SHEEP_ATTEND,
          user: user,
          attendee: attending
        });
      });
    } else {
      EventAPI.removeParticipant(event, user).then(function (user) {
        AppDispatcher.dispatch({
          actionType: AppConstants.EVENT_SHEEP_ATTEND,
          user: user,
          attendee: attending
        });
      });
    }
  }
};

module.exports = EventDetailActions;
