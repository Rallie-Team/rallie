/**
 * This is an action creator, which is a collection of methods that are called to send actions to the dispatcher.
 * This is the action creator for the app that defines all the possible actions for the app.
 */

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    AppConstants = require('../constants/AppConstants');

var AppActions = {
  /**
   * Toggle the user mode
   * @param {string} targetMode The target mode to toggle to
   * @param {string} id The unique ID for the user
   */

      // $.ajax({
    //   url: url,
    //   success: function(data) {
    //     AppDispatcher.dispatch({
    //       action: AppConstants.TOGGLE_MODE,
    //       events: data.events
    //     });
    //   },
    //   error: function(data) {
    //     console.error('Toggle failed', data);
    //   }
    // });

  toggleMode: function(targetMode, id) {
    var url = ''; // TODO: Set default URL to be sheep
    if (targetMode === 'shepherd') {
      url = '/api/'; // TODO: Fill in shepherd URL
    }

    AppDispatcher.dispatch({
      actionType: AppConstants.TOGGLE_MODE,
      events: [{name: 'Event 1', location: 'SF'}, {name: 'Event 2', location: 'LA'}]
    });
  },

  //relays information to App Store to add the information
  //of the current user
  setCurrentUser: function(user){
    AppDispatcher.dispatch({
      action: AppConstants.SET_CURRENT_USER,
      user: user
    });
  },

  //relays information to App Store to remove the information
  //of the current user
  removeCurrentUser: function(){
    AppDispatcher.dispatch({
      action: AppConstants.REMOVE_CURRENT_USER
    });
  }
};

module.exports = AppActions;
