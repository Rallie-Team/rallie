var React = require('react'),
    Navigation = require('react-router').Navigation,
    EventStore = require('../../stores/EventStore'),
    EventActions = require('../../actions/EventActions'),
    AppStore = require('../../stores/AppStore');

var EventCreate = React.createClass({
  mixins: [Navigation],

  //initially sets the inputs of the Event to blank
  //will be filed in the form
  getInitialState: function() {
    return {
      name: '',
      location: '',
      result: ''
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
            <input className="form-control inputBox" type="text" name="name" id="name" placeholder="Event name" value={this.state.name} onChange={this._onChange} />
          </div>
          <div className="form-group">
            <label htmlFor="location">Event location</label>
            <input className="form-control inputBox" type="text" name="location" id="location" placeholder="Event location" value={this.state.location} onChange={this._onChange} />
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
      action: ''
    };
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
      result: 'Event created!'
    });
    this.transitionTo('events');
  }
});

module.exports = EventCreate;
