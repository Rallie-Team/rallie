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
   */
  toggleMode: function(targetMode) {
    AppDispatcher.dispatch({
      actionType: AppConstants.TOGGLE_MODE,
      mode: targetMode
    });
  },

  //relays information to App Store to add the information
  //of the current user
  setCurrentUser: function(user){
    // console.log(user);
    AppDispatcher.dispatch({
      actionType: AppConstants.SET_CURRENT_USER,
      user: user
    });
  },

  //relays information to App Store to remove the information
  //of the current user
  removeCurrentUser: function(){
    // console.log('inside of appactions removeCurrentUser');
    AppDispatcher.dispatch({
      actionType: AppConstants.REMOVE_CURRENT_USER
    });

  }
};

module.exports = AppActions;
