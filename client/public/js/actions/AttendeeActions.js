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
  getAllByEvent: function(eventId) {
    console.log(eventId, 'inside of AttendeeActions');
    AttendeeAPI.getAllAttendeesByEvent(eventId).then(function(attendees) {
      AppDispatcher.dispatch({
        actionType: AppConstants.ATTENDEES_GET,
        attendees: attendees
      });
    });
  }

};

module.exports = AttendeeActions;
