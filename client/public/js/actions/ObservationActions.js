/**
 * This is an action creator, which is a collection of methods that are called to send actions to the dispatcher.
 * This is the action creator for observations that defines all the possible actions for observations.
 */

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    AppConstants = require('../constants/AppConstants'),
    ObservationAPI = require('../utils/ObservationAPI'),
    assign = require('object-assign');

var ObservationActions = {
  /**
   * Get all observations for an event
   * @param {number} eventId The primary key of the event in the database
   */
  getAllByEvent: function(eventId) {
    // console.log(eventId, 'eventID inside of observationActions');
    ObservationAPI.getAllObservationsByEvent(eventId).then(function(observations) {
      // console.log(observations, "observations inside of observationActions");
      AppDispatcher.dispatch({
        actionType: AppConstants.OBSERVATION_GET,
        observations: observations
      });
    });
  },

  /**
   * Create an observation
   * @param {object} data An object containing the attributes of the observation
   */
  create: function(data) {
    ObservationAPI.addObservation(data).then(function(observations) {
      // The server will respond with an array containing only the newly-created observation
      AppDispatcher.dispatch({
        actionType: AppConstants.OBSERVATION_CREATE,
        observations: observations
      });
    });
  }
};

module.exports = ObservationActions;
