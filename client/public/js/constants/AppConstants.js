// Defines various constants for the app

// keymirror creates an object with values equal to its key names
var keyMirror = require('keymirror');

// AppConstants is referenced from the files in the actions folder
// This creates modularity for how events are referenced and
// creates a list of all events in the app.
module.exports = keyMirror({
  EVENT_GET: null,
  EVENT_CREATE: null,
  EVENT_EDIT: null,
  EVENT_DELETE: null,
  TOGGLE_MODE: null,
  UPDATE_CURRENT_EVENT: null,
  OBSERVATION_CREATE: null,
  OBSERVATION_GET: null,
  REMOVE_CURRENT_USER: null,
  SET_CURRENT_USER: null,
  SHEEPS_GET: null,
  SHEPHERDS_GET: null,
  EVENT_SHEEP_ATTEND: null,
  SHEPHERD_EVENT_GET: null,
  NOT_SHEPHERD_EVENT_GET: null
});
