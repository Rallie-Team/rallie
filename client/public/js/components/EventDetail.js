var React = require('react'),
    EventStore = require('../stores/EventStore'),
    EventDetailStore = require('../stores/EventDetailStore'),
    EventDetailActions = require('../actions/EventDetailActions'),
    ObservationList = require('./ObservationList'),
    ObservationCreate = require('./ObservationCreate');

var EventDetail = React.createClass({
  getInitialState: function() {
    return EventStore.getCurrentEvent();
  },

  componentDidMount: function() {
    EventDetailStore.addEventListener('create', this._onCreate);
  },

  componentWillUnmount: function() {
    EventDetailStore.removeEventListener('create', this._onCreate);
  },

  render: function() {
    return (
      <div>

      <p>Event: {this.state.name}
      {this.state.mode === 'shepherd' ? <button onClick={this._editEvent}>Edit Event</button> : null}
      </p>

      <p>Location: {this.state.location}
      {this.state.mode === 'shepherd' ? <button onClick={this._editAction}>Edit Action</button> : null}
      </p>

      {this.state.mode === 'sheep' ? <ObservationCreate/> : null}

      <ObservationList/>

      </div>
    );
  },

  _editEvent: function(){
    EventDetailActions.edit();
  },

  _editAction: function(){
    EventDetailActions.edit();
  },

  _onCreate: function(){
    this.setState(this.getInitialState);
  }

});

module.exports = EventDetail;
