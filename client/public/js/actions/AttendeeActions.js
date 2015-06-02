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
   * Get all observations for an event
   * @param {number} eventId The primary key of the event in the database
   */
  getAllSheepsByEvent: function(eventId) {
    // console.log(eventId, 'inside of AttendeeActions');
    AttendeeAPI.getAllSheepsByEvent(eventId).then(function(sheeps) {
      // console.log(sheeps, 'sheeps insode of AttendeeActions');
      AppDispatcher.dispatch({
        actionType: AppConstants.SHEEPS_GET,
        sheeps: sheeps
      });
    });
  },

  getAllShepherdsByEvent: function(eventId) {
    // console.log(eventId, 'inside of AttendeeActions');
    AttendeeAPI.getAllShepherdsByEvent(eventId).then(function(shepherds) {
      // console.log(shepherds, 'shepherds insode of AttendeeActions');
      AppDispatcher.dispatch({
        actionType: AppConstants.SHEPHERDS_GET,
        shepherds: shepherds
      });
    });
  }

};

module.exports = AttendeeActions;
