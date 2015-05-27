/**
 * This is an action creator, which is a collection of methods that are called to send actions to the dispatcher.
 * This is the action creator for an event that defines all the possible actions for an events.
 */

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    AppConstants = require('../constants/AppConstants');

var EventDetailActions = {
  edit: function(){
    AppDispatcher.dispatch({
      action: AppConstants.EVENT_EDIT,
      name: event.name,
      location: event.location
    });
  }
};

module.exports = EventDetailActions;
