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
var prevEvent;

var EventDetail = React.createClass({
  mixins: [Navigation],

  getInitialState: function() {
    prevEvent = EventDetailStore.getCurrentEvent();
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
          <table>
          <tr>
          <td>
          <h3>
            Currently {this.state.isAttendee ? 'Attending' : 'Observing'}
          </h3>
          </td>
          <td>
            { (this.state.mode === 'sheep') ?
              <button className="btn btn-default btn-sm attend-button" onClick={this._attend}>
                {this.state.isAttendee ? 'Leave' : 'Attend'} Event
              </button> : null }
          </td>
          </tr>
          </table>
        </div>

        <hr/>

        <div className="row">

        <div className="col-md-7">
        <table className="event-info-table">
          <tr>
            <td>
              <div className="event-detail-name">
                <h2>{this.state.event.name}</h2>
              </div>
            </td>
            <td>
              {this.state.mode === 'shepherd' ? <button className="btn btn-default edit-buttons" onClick={this._editName}>Edit Name</button> : null}
            </td>      
          </tr>
          <tr>
            <td>
              <div className="event-detail-description">
                {this.state.event.description}
              </div>
            </td>
            <td>
              {this.state.mode === 'shepherd' ? <button className="btn btn-default edit-buttons" onClick={this._editDescription}>Edit Description</button> : null}
            </td>
          </tr>
          <tr>
            <td>
              <div className="event-detail-location">
                {this.state.event.location}
              </div>
            </td>    
            <td>
              { this.state.mode === 'shepherd' ? <button className="btn btn-default edit-buttons" onClick={this._editLocation}>Edit Location</button> : null }
            </td>
          </tr>
          <tr>
            <td>
              {/* Use Moment.js to format start and end times to the following format: Mon, Jun 1, 2015 4:30 PM */}
              <div className="event-detail-time">{moment(this.state.event.start).format('lll')} -  
                {moment(this.state.event.end).format('lll')}
              </div>
            </td> 
            <td>
              { this.state.mode === 'shepherd' ? <button className="btn btn-default edit-buttons" onClick={this._endEvent}>End Event</button> : null }
            </td>
          </tr>
          <tr>
            <td>
              <div className="event-detail-action">
                Action: {this.state.event.action}
              </div>
            </td> 
            <td>
              { this.state.mode === 'shepherd' ? <button className="btn btn-default edit-buttons" onClick={this._editAction}>Edit Action</button> : null }
            </td>
          </tr>
        </table>
        </div>

        <div className="col-md-5">
          <AttendeesList eventId={this.state.event.id || this.props.params.eventId}/>
        </div>

        </div>
        <hr/>
        <ObservationList eventId={this.state.event.id || this.props.params.eventId} mode={this.state.mode} isAttendee={this.state.isAttendee}/>
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

  _editDescription: function(){
    var obj = this.state.event;
    var description = prompt('What is the new description?').trim();
    if (this.isResponseValid(description)){
      obj.description = description;
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
    EventDetailActions.attend(this.state.event, AppStore.getCurrentUser(), !this.state.isAttendee);
  },

  _onAttend: function() {
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
