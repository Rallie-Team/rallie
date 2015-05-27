var React = require('react'),
    EventStore = require('../stores/EventStore'),
    EventDetailActions = require('../actions/EventDetailActions'),
    ObservationList = require('./ObservationList');

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
      <ObservationList/>
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
