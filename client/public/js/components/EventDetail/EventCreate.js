var React = require('react'),
    Navigation = require('react-router').Navigation,
    EventStore = require('../../stores/EventStore'),
    EventActions = require('../../actions/EventActions'),
    AppStore = require('../../stores/AppStore');

    require('react-input');

var EventCreate = React.createClass({
  mixins: [Navigation],

  //initially sets the inputs of the Event to blank
  //will be filed in the form
  getInitialState: function() {
    return {
      name: '',
      location: '',
      result: '',
      startTime: '',
      endTime: '',
      startDate: '',
      endDate: ''
    };
  },

  //Clears default values after event is created
  componentDidMount: function() {
    EventStore.addEventListener('create', this._onCreate);
  },

  //Clears eventlistener when dom node is deleted
  componentWillUnmount: function() {
    EventStore.removeEventListener('create', this._onCreate);
  },

  //asks for users inputs if they want to create an event
  render: function() {
    return (
      <div className="event-create">
        <form className="eventCreateForm" onSubmit={this._save}>
          <div className="form-group">
            <label htmlFor="name">Event name</label>
            <input className="form-control inputBox" required={true} type="text" name="name" id="name" placeholder="Event name" value={this.state.name} onChange={this._onChange} />
          </div>
          <div className="form-group">
            <label htmlFor="location">Event location</label>
            <input className="form-control inputBox" required={true} type="text" name="location" id="location" placeholder="Event location" value={this.state.location} onChange={this._onChange} />
          </div>
          <div className="form-group">
            <label htmlFor="date">Start Date</label>
            <input className="form-control inputBox" required={true} type="date" name="startDate" id="startDate" value={this.state.startDate} onChange={this._onChange} />
          </div>
          <div className="form-group">
            <label htmlFor="date">End Date</label>
            <input className="form-control inputBox" required={true} type="date" name="endDate" id="endDate" value={this.state.endDate} onChange={this._onChange} />
          </div>
          <div className="form-group">
            <label htmlFor="time">Start Time</label>
            <input className="form-control inputBox" required={true} type="time" name="startTime" id="startTime" placeholder="Event startTime" value={this.state.startTime} onChange={this._onChange} />
          </div>
          <div className="form-group">
            <label htmlFor="time">End Time</label>
            <input className="form-control inputBox" required={true} type="time" name="endTime" id="endTime" placeholder="Event endTime" value={this.state.endTime} onChange={this._onChange} />
          </div>
          <button type="submit" className="btn btn-default">Submit</button>
        </form>
        <div className="event-create-result">{this.state.result}</div>
      </div>
    );
  },

  // Add new event to the state and database
  // .target redferences the dom node of e
  _save: function(e) {
    e.preventDefault();
    var data = {
      userId: AppStore.getCurrentUser().id,
      name: this.state.name,
      location: this.state.location,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      action: 'the event has not yet started',
      startDate: this.state.startDate,
      endDate: this.state.endDate
    };

    /**
     * this portion combines the start date with the start time to be store in DB
     * and does this with the end date and end time
     * Only the event startTime and endTime are referred to in the DB.
     */
    data.startTime = new Date(data.startDate.concat(" ", data.startTime)).toISOString();
    data.endTime = new Date(data.endDate.concat(" ", data.endTime)).toISOString();

    EventActions.create(data);
  },

  // Update the current state with the new values in the input fields
  // every time the user tpes a letter
  // this updates the state values that were defined in getInitialState
  _onChange: function(e) {
    var obj = {};
    obj[e.target.name] = e.target.value;
    this.setState(obj);
  },

  // Event handler for 'create' events coming from the EventStore
  // clears default calues of name and location
  _onCreate: function() {
    this.setState({
      name: '',
      location: '',
      startTime: '',
      endTime: '',
      startDate: '',
      endDate: '',
      result: 'Event created!'
    });
    this.transitionTo('events');
  }
});

module.exports = EventCreate;
