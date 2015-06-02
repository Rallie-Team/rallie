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

  // Adds event listeners when events are created or edited
  componentDidMount: function() {
    EventDetailStore.addEventListener('create', this._onCreate);
    EventStore.addEventListener('edit', this._onEdit);
  },

  // Removes event listener when events are deleted or edited
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
          { this.state.mode === 'shepherd' ? <button onClick={this._editLocation}>Edit Location</button> : null}
        </p>
        { /* TODO: Set up API end point to track whether a user is in an event */ }
        { /* Display Join or Leave event based on whether the sheep is currently in the event */ }
        { (this.state.mode === 'sheep' && true) ? <button onClick={this._toggleJoin}>Leave Event</button> : null }
        { (this.state.mode === 'sheep' && false) ? <button onClick={this._toggleJoin}>Join Event</button> : null }

        { /* Add the observation create if and only if sheep is attending event */ }
        { (this.state.mode === 'sheep' && true) ? <ObservationCreate eventId={this.state.id}/> : null }
        <ObservationList eventId={this.state.id}/>
      </div>
    );
  },

  // Created a prompt to change the event name
  _editEvent: function(){
    var obj = this.state;
    obj.name = prompt('What should the Event be called?');
    EventDetailActions.edit(obj);
  },

  // Sets the initial stat of an event
  _onCreate: function(){
    this.setState(this.getInitialState);
  },

  // Created a prompt to change the event location
  _editLocation: function(){
    var obj = this.state;
    obj.location = prompt('Where is the location?');
    EventDetailActions.edit(obj);
  },

  // Updates the current event properties on the page
  _onEdit: function(){
    this.setState(EventStore.getCurrentEvent());
  },

  // Toggles whether a sheep is participating or not in an event
  // TODO: Add functionality to this function
  _toggleJoin: function () {
    console.log('Joining the event in EventDetail.js');
    // EventDetailActions.join(this.)
  }

});

module.exports = EventDetail;
