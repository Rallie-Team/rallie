// Defines various constants for the app

// keymirror creates an object with values equal to its key names
var keyMirror = require('keymirror');

//AppConstants is referenced from the files in the actions folder
//This creates modularity for how events are referenced and
//creates a list of all events in the app.
module.exports = keyMirror({
  EVENT_CREATE: null,
  EVENT_DELETE: null,
  TOGGLE_MODE: null,
  UPDATE_STATE: null,
  OBSERVATION_CREATE: null,
  EDIT: null
});
