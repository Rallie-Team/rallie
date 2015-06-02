/**
 * This is an action creator, which is a collection of methods that are called to send actions to the dispatcher.
 * This is the action creator for an event that defines all the possible actions for an events.
 */

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    AppConstants = require('../constants/AppConstants'),
    EventAPI = require('../utils/EventAPI'),
    assign = require('object-assign');

var EventDetailActions = {
  /**
   * Edit and update event details
   * @param {object} event An updated representation of the event attributes
   */
  edit: function(event) {
    EventAPI.editEvent(event).then(function(event) {
      // Use object-assign to combine event properties with the action property
      // and dispatch the collective properties as one object
      var data = assign({actionType: AppConstants.EVENT_EDIT}, event);
      AppDispatcher.dispatch(data);
    });
  },

  /**
   * Join the event as a sheep
   */
  join: function (event) {
    console.log('Hit join in EventDetailActions');
    // EventAPI.joinEvent(event).then(function(event) {
    //   // var data = assign 
    //   // AppDispatcher.dispatch(data);
    // })
  }
};

module.exports = EventDetailActions;
