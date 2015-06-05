/**
 * This is an action creator, which is a collection of methods that are called to send actions to the dispatcher.
 * This is the action creator for observations that defines all the possible actions for observations.
 */

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    AppConstants = require('../constants/AppConstants'),
    AttendeeAPI = require('../utils/AttendeeAPI'),
    assign = require('object-assign');

var AttendeeActions = {
  /**
   * Get all attendees for an event
   * @param {number} eventId The primary key of the event in the database
   */
  getAllSheepsByEvent: function(eventId) {
    AttendeeAPI.getAllSheepsByEvent(eventId).then(function(sheeps) {
      AppDispatcher.dispatch({
        actionType: AppConstants.SHEEPS_GET,
        sheeps: sheeps
      });
    });
  },
  /**
   * getAllShepherdsByEvent gets all shephards for a specific event
   * the response is an array of objects containing information about
   * the shepherds
   */
  getAllShepherdsByEvent: function(eventId) {
    AttendeeAPI.getAllShepherdsByEvent(eventId).then(function(shepherds) {
      AppDispatcher.dispatch({
        actionType: AppConstants.SHEPHERDS_GET,
        shepherds: shepherds
      });
    });
  }

};

module.exports = AttendeeActions;
