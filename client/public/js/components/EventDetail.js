var React = require('react'),
    EventDetailActions = require('../actions/EventDetailActions'),
    EventStore = require('../stores/EventStore'),
    EventDetailActions = require('../actions/EventDetailActions');

var EventDetail = React.createClass({
  getInitialState: function() {
    return EventStore.getCurrentEvent();
  },

  componentDidMount: function() {
    // EventDetailStore.addEventListener('create', this._onCreate);
  },

  componentWillUnmount: function() {
    // EventDetailStore.removeEventListener('create', this._onCreate);
  },

  render: function() {
    return (
      <div>
      <p>{this.state.name}</p>
      {this.state.name}
      <button onClick={this._editEvent}>Edit Event</button>
      {this.state.location}
      <button onClick={this._editAction}>Edit Action</button>
      </div>
    );
  },

  _editEvent: function(){
    EventDetailActions.edit();
  },

  _editAction: function(){
    EventDetailActions.edit();
  }

});

module.exports = EventDetail;
