var React = require('react'),
    EventStore = require('../stores/EventStore'),
    EventActions = require('../actions/EventActions');

var EventCreate = React.createClass({

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
        <form onSubmit={this._save}>
          <input type="text" name="name" placeholder="Event name" value={this.state.name} onChange={this._onChange} />
          <input type="text" name="location" placeholder="Event location" value={this.state.location} onChange={this._onChange} />
          <input type="submit" value="Submit" />
        </form>
        <div className="event-create-result">{this.state.result}</div>
      </div>
    );
  },

  // Add new event to the state and database
  // .target redferences the dom node of e
  _save: function(e) {
    e.preventDefault();
    var newEvent = {
      name: e.target.name.value.trim(),
      location: e.target.location.value.trim()
    };
    EventActions.create(newEvent);
  },

  // Update the current state with the new values in the input fields
  // every time the user tpes a letter
  // this updates the state values that were defined in getInitialState
  _onChange: function(e) {
    var obj = {};
    console.log(e.target, "targeted node");
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
  }
});

module.exports = EventCreate;
