var React = require('react'),
    Navigation = require('react-router').Navigation,
    AppStore = require('../../stores/AppStore'),
    EventDetailStore = require('../../stores/EventDetailStore'),
    EventDetailActions = require('../../actions/EventDetailActions'),
    ObservationList = require('../ObservationList/ObservationList'),
    ObservationCreate = require('../ObservationList/ObservationCreate'),
    AttendeesList = require('../AttendeesList/AttendeesList'),
    AttendeeStore = require('../../stores/AttendeeStore');

var intervalId;
var prevEvent, prevIsAttendee;

var EventDetail = React.createClass({
  mixins: [Navigation],

  getInitialState: function() {
    prevEvent = EventDetailStore.getCurrentEvent();
    prevIsAttendee = EventDetailStore.isAttendee();
    return {
      mode: AppStore.getCurrentMode(),
      isAttendee: EventDetailStore.isAttendee(),
      event: EventDetailStore.getCurrentEvent()
    };
  },

  // Adds event listeners when events are created or edited
  componentDidMount: function() {
    EventDetailStore.addEventListener('edit', this._onEdit);
    EventDetailStore.addEventListener('updateCurrentEvent', this._onEventSet);
    EventDetailStore.addEventListener('attend', this._onAttend);
    AttendeeStore.addEventListener('acquiredSheep', this._onAcquireSheep);
    if (this.props.params.eventId) {
      EventDetailActions.get(this.props.params.eventId);
      intervalId = setInterval(function(){EventDetailActions.get(this.props.params.eventId)}.bind(this), 2000);
    }
  },

  // Removes event listener when events are deleted or edited
  componentWillUnmount: function() {
    EventDetailStore.removeEventListener('edit', this._onEdit);
    EventDetailStore.removeEventListener('updateCurrentEvent', this._onEventSet);
    EventDetailStore.removeEventListener('attend', this._onAttend);
    AttendeeStore.removeEventListener('acquiredSheep', this._onAcquireSheep);
    clearInterval(intervalId);
  },

  render: function() {
    return (
      <div className="event-detail">
        <div className="event-detail-attendee">
          <h3>
            Currently {this.state.isAttendee ? 'Attending' : 'Observing'} Event
              { (this.state.mode === 'sheep') ?
              <button className="btn btn-default" onClick={this._attend}>
                {this.state.isAttendee ? 'Leave' : 'Attend'} Event
              </button> : null }
          </h3>
        </div>

        <div className="event-detail-name">
          <h2>{this.state.event.name}
            {this.state.mode === 'shepherd' ? <button className="btn btn-default" onClick={this._editName}>Edit Name</button> : null}
          </h2>
        </div>
        {/* Use Moment.js to format start and end times to the following format: Mon, Jun 1, 2015 4:30 PM */}
        <div className="event-detail-start">Start: {moment(this.state.event.start).format('llll')}</div>
        <div className="event-detail-end">
          End: {moment(this.state.event.end).format('llll')}
          { this.state.mode === 'shepherd' ? <button className="btn btn-default" onClick={this._endEvent}>End Event</button> : null }
        </div>
        <div className="event-detail-location">Location: {this.state.event.location}
          { this.state.mode === 'shepherd' ? <button className="btn btn-default" onClick={this._editLocation}>Edit Location</button> : null }
        </div>
        <div className="event-detail-action">Action: {this.state.event.action}
          { this.state.mode === 'shepherd' ? <button className="btn btn-default" onClick={this._editAction}>Edit Action</button> : null }
        </div>

        <AttendeesList eventId={this.state.event.id || this.props.params.eventId}/>

        { /* Add the observation create if and only if sheep is attending event */ }
        { (this.state.mode === 'sheep' && this.state.isAttendee) ? <ObservationCreate eventId={this.state.event.id}/> : null }
        <ObservationList eventId={this.state.event.id || this.props.params.eventId}/>
      </div>
    );
  },

  _onEventSet: function() {
    var storeCurrentEvent = EventDetailStore.getCurrentEvent();
    if (prevEvent.action !== storeCurrentEvent.action){
      prevEvent = storeCurrentEvent;
      if (this.state.mode === 'sheep'){
        alert(storeCurrentEvent.action);
      }
    } 
    this.setState({event: storeCurrentEvent});
  },

  // Created a prompt to change the event name
  _editName: function(){
    var obj = this.state.event;
    var name = prompt('What should the Event be called?').trim();
    if (this.isResponseValid(name)){
      obj.name = name;
      EventDetailActions.edit(obj);
    } else {
      alert('Input cannot be an empty string');
    }
  },

  // Created a prompt to change the event location
  _editLocation: function(){
    var obj = this.state.event;
    var location = prompt('Where is the location?').trim();
    if (this.isResponseValid(location)){
      obj.location = location;
      EventDetailActions.edit(obj);
    } else {
      alert('Input cannot be an empty string');
    }
  },

  // Created a prompt to change the event action
  _editAction: function(){
    var obj = this.state.event;
    var action = prompt('What is the action?').trim();
    if (this.isResponseValid(action)){
      obj.action = action;
      EventDetailActions.edit(obj);
    } else {
      alert('Input cannot be an empty string');
    }
  },

  // Toggles whether a sheep is participating or not in an event
  _attend: function () {
    this.state.isAttendee = !this.state.isAttendee;
    EventDetailActions.attend(this.state.event, AppStore.getCurrentUser(), this.state.isAttendee);
  },

  _onAttend: function() {
    // console.log(EventDetailStore.isAttendee());
    this.setState({isAttendee: EventDetailStore.isAttendee()});
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
  
  _onAcquireSheep: function() {
    var participatingSheep = AttendeeStore.getAllSheep();
    var currentUserId = AppStore.getCurrentUser().id;
    var currentUserAttendee = false;
    for (var i = 0; i < participatingSheep.length; i++) {
      if (participatingSheep[i]['id'] === currentUserId) {
        currentUserAttendee = true;
        break;
      }
    }
    this.setState({isAttendee: currentUserAttendee});
  },


  isResponseValid: function(input){
    return input.trim() !== '';
  },

  // Set the event end time to now so that it is no longer considered an active event
  _endEvent: function() {
    var obj = this.state.event;
    obj.end = new Date().toISOString();
    EventDetailActions.edit(obj);
  }

});

module.exports = EventDetail;
