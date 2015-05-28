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
    //adds an event listener for when events are created
    EventDetailStore.addEventListener('create', this._onCreate);
    //adds an event listener for when current event is edited
    EventStore.addEventListener('edit', this._onEdit);
  },

  componentWillUnmount: function() {
    //removes an event listener for when events are deleted
    EventDetailStore.removeEventListener('create', this._onCreate);
    //removes an event listener for when events are edited
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
  //created a prompt asking for waht the user wants to change the event to
  _editEvent: function(){
    this.state.name = prompt('What should the Event be called?');
    EventDetailActions.edit(this.state);
  },

  _onCreate: function(){
    this.setState(this.getInitialState);
  },

  //created a prompt asking for waht the user wants to change the event to
  _editLocation: function(){
    this.state.location = prompt('What should the location be?');
    EventDetailActions.edit(this.state);

  },

  _onEdit: function(){
    this.setState(this.getInitialState);
  }

});


module.exports = EventDetail;
