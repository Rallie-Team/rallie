var React = require('react'),
    Navigation = require('react-router').Navigation,
    AppStore = require('../stores/AppStore'),
    EventDetailStore = require('../stores/EventDetailStore'),
    EventDetailActions = require('../actions/EventDetailActions'),
    ObservationList = require('./ObservationList'),
    ObservationCreate = require('./ObservationCreate'),
    AttendeesList = require('./AttendeesList');

var EventDetail = React.createClass({
  mixins: [Navigation],

  getInitialState: function() {
    return {
      mode: AppStore.getCurrentMode(),
      event: EventDetailStore.getCurrentEvent()
    };
  },

  // Adds event listeners when events are created or edited
  componentDidMount: function() {
    EventDetailStore.addEventListener('edit', this._onEdit);
    EventDetailStore.addEventListener('updateCurrentEvent', this._onEventSet);
  },

  // Removes event listener when events are deleted or edited
  componentWillUnmount: function() {
    EventDetailStore.removeEventListener('edit', this._onEdit);
    EventDetailStore.removeEventListener('updateCurrentEvent', this._onEventSet);
  },

  render: function() {
    return (
      <div className="event-detail">
        <div className="event-detail-name">Event: {this.state.event.name}
          {this.state.mode === 'shepherd' ? <button onClick={this._editName}>Edit Name</button> : null}
        </div>
        {/* Use Moment.js to format start and end times to the following format: Mon, Jun 1, 2015 4:30 PM */}
        <div className="event-detail-start">Start: {moment(this.state.event.start).format('llll')}</div>
        <div className="event-detail-end">
          End: {moment(this.state.event.end).format('llll')}
          { this.state.mode === 'shepherd' ? <button onClick={this._endEvent}>End Event</button> : null }
        </div>
        <div className="event-detail-location">Location: {this.state.event.location}
          { this.state.mode === 'shepherd' ? <button onClick={this._editLocation}>Edit Location</button> : null }
        </div>
        { /* TODO: Set up API end point to track whether a user is in an event */ }
        { /* Display Join or Leave event based on whether the sheep is currently in the event */ }
        { (this.state.mode === 'sheep' && true) ? <button onClick={this._toggleJoin}>Leave Event</button> : null }
        { (this.state.mode === 'sheep' && false) ? <button onClick={this._toggleJoin}>Join Event</button> : null }
        <AttendeesList eventId={this.state.event.id}/>

        { /* Add the observation create if and only if sheep is attending event */ }
        { (this.state.mode === 'sheep' && true) ? <ObservationCreate eventId={this.state.event.id}/> : null }
        <ObservationList eventId={this.state.event.id}/>
      </div>
    );
  },

  _onEventSet: function() {
    this.setState({event: EventDetail.getCurrentEvent()});
  },

  // Created a prompt to change the event name
  _editName: function(){
    var obj = this.state.event;
    obj.name = prompt('What should the Event be called?');
    EventDetailActions.edit(obj);
  },

  // Created a prompt to change the event location
  _editLocation: function(){
    var obj = this.state.event;
    obj.location = prompt('Where is the location?');
    EventDetailActions.edit(obj);
  },

  // Updates the current event properties on the page
  _onEdit: function(){
    this.setState({event: EventDetailStore.getCurrentEvent()});

    // If the event's end time is updated and is earlier than now,
    // redirect to the events list.
    // this.state.event.end will be a string of the date in ISO format
    if (new Date() > new Date(this.state.event.end)) {
      this.transitionTo('events');
    }
  },

  // Toggles whether a sheep is participating or not in an event
  // TODO: Add functionality to this function
  _toggleJoin: function () {
    console.log('Joining the event in EventDetail.js');
    // EventDetailActions.join(this.)
  },

  // Set the event end time to now so that it is no longer considered an active event
  _endEvent: function() {
    var obj = this.state.event;
    obj.end = new Date().toISOString();
    EventDetailActions.edit(obj);
  }

});

module.exports = EventDetail;
