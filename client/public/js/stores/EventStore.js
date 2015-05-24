var EventEmitter = require('events').EventEmitter,
    assign = require('object-assign'),
    AppDispatcher = require('../dispatcher/AppDispatcher'),
    AppConstants = require('../constants/AppConstants');

var _events = [{name: 'Riot at Hack Reactor', location: 'Hack Reactor HQ'}, {name: 'Flash Mob Dance Party', location: 'City Hall'}];

var EventStore = assign({}, EventEmitter.prototype, {
  getAll: function() {
    console.log('sending events', _events);
    return _events;
  },

  emitChange: function() {
    this.emit('change');
  },

  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(payload) {
  switch(payload.action) {
    // TODO: NEED TO IMPLEMENT HANDLER FOR CREATING EVENTS
    case AppConstants.EVENT_CREATE:
      EventStore.emitChange();
      break;

    // TODO: NEED TO IMPLEMENT HANDLER FOR DELETING EVENTS
    case AppConstants.EVENT_DELETE:
      EventStore.emitChange();
      break;

    // TODO: IMPLEMENT OTHER HANDLERS FOR EVENTS

    default:
      // no op
  }
});

module.exports = EventStore;
