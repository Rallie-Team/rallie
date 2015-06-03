var EventEmitter = require('events').EventEmitter,
    assign = require('object-assign'),
    AppDispatcher = require('../dispatcher/AppDispatcher'),
    AppConstants = require('../constants/AppConstants'),
    AppActions = require('../actions/AppActions'),
    cookie = require('react-cookie');

var _currentUser = {id: undefined, username: undefined};
var _currentMode = 'sheep'; // the default mode is sheep

var AppStore = assign({}, EventEmitter.prototype, {

  getCurrentUser: function() {
    return _currentUser;
  },

  getCurrentMode: function() {
    return _currentMode;
  },

  /**
   * Trigger an event
   * @param {string} eventName The name of the event
   */
  emitEvent: function(eventName) {
    this.emit(eventName);
  },

  /**
   * Register a callback to invoke when an event is triggered
   * @param {string} eventName The name of the event
   * @param {function} callback The callback function to invoke when the event is triggered
   */
  addEventListener: function(eventName, callback) {
    this.on(eventName, callback);
  },

  /**
   * Prevent a callback from being invoked when an event is triggered
   * @param {string} eventName The name of the event
   * @param {function} callback Stops the callback function from being invoked when the event is triggered
   */
  removeEventListener: function(eventName, callback) {
    this.removeListener(eventName, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(payload) {
  switch(payload.actionType) {
    case AppConstants.TOGGLE_MODE:
      _currentMode = payload.mode;
      AppStore.emitEvent('toggleMode');
      break;

    case AppConstants.SET_CURRENT_USER:
      _currentUser.id = payload.user.id;
      _currentUser.username = payload.user.username;
      // console.log(payload, 'payloaddd');
      AppStore.emitEvent('loggedIn');
      break;

    case AppConstants.REMOVE_CURRENT_USER:
      console.log('removing cookie user inside of appstore.js');
      _currentUser.id = undefined;
      _currentUser.name = undefined;
      cookie.remove('username');
      cookie.remove('id');
      AppStore.emitEvent('loggedOut');
      break;

    default:
      // no op
  }
});

module.exports = AppStore;
