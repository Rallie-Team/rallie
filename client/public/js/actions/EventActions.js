/**
 * This is an action creator, which is a collection of methods that are called to send actions to the dispatcher.
 * This is the action creator for events that defines all the possible actions for modifying events.
 */

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    AppConstants = require('../constants/AppConstants'),
    EventAPI = require('../utils/EventAPI');

var EventActions = {
  
  /**
   * Returns all events where the user is not the host of the event.
   * Events are returned in the events property of the return object.
   * The values are an array of event objects from the Events.
   */
  getAllEventsNotByShepherd:  function() {
    EventAPI.getAllEventsNotByShepherd().then(function(events) {
      AppDispatcher.dispatch({
        actionType: AppConstants.NOT_SHEPHERD_EVENT_GET,
        events: events
      });
    });
  },

  /**
   * Returns all events where the user is the host of the event.
   * Events are returned in the events property of the return object.
   * The values are an array of event objects from the Events.
   * @param {int} hostId The current primary key for the host used to access the join between the events and user hosts
   */
  getAllEventsByShepherd: function(hostId) {
    EventAPI.getAllEventsByShepherd(hostId).then(function(events) {
      AppDispatcher.dispatch({
        actionType: AppConstants.SHEPHERD_EVENT_GET,
        events: events
      });
    });
  },

  /**
   * Returns all events where the user is a participant in the event.
   * This action is used to show which events where the current user is currently a part participant
   * on the home screen.
   * Events are returned in the events property of the return object.
   * The values are an array of event objects from the Events.
   * @param {int} participantId The current primary key for the host used to access the join between the events and participants
   */
  getAllEventsBySheep: function(participantId) {
    EventAPI.getAllEventsBySheep(participantId).then(function(events) {
      AppDispatcher.dispatch({
        actionType: AppConstants.SHEEP_EVENT_GET,
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
