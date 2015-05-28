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
    EventStore.addEventListener('edit', this._onEdit);
  },

  componentWillUnmount: function() {
    EventDetailStore.removeEventListener('create', this._onCreate);
    EventStore.removeEventListener('edit', this._onEdit);
  },

  render: function() {
    return (
      <div>

      <p>Event: {this.state.name}
      {this.state.mode === 'shepherd' ? <button onClick={this._editEvent}>Edit Event</button> : null}
      </p>

      <p>Location: {this.state.location}
      {this.state.mode === 'shepherd' ? <button onClick={this._editLocation}>Edit Location</button> : null}
      </p>

      {this.state.mode === 'sheep' ? <ObservationCreate/> : null}

      <ObservationList/>

      </div>
    );
  },

  _editEvent: function(){
    this.state.name = prompt('What should the Event be called?');
    EventDetailActions.edit(this.state);
  },

  _onCreate: function(){
    this.setState(this.getInitialState);
  },

  _editLocation: function(){
    this.state.location = prompt('What should the location be?');
    EventDetailActions.edit(this.state);

  },

  _onEdit: function(){
    this.setState(this.getInitialState);
  }

});


module.exports = EventDetail;
