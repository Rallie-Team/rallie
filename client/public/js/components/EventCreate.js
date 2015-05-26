var React = require('react'),
    EventStore = require('../stores/EventStore'),
    EventActions = require('../actions/EventActions');

var EventCreate = React.createClass({
  getInitialState: function() {
    return {
      name: '',
      location: '',
      result: ''
    };
  },

  componentDidMount: function() {
    EventStore.addEventListener('create', this._onCreate);
  },

  componentWillUnmount: function() {
    EventStore.removeEventListener('create', this._onCreate);
  },

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
  _save: function(e) {
    e.preventDefault();
    var newEvent = {
      name: e.target.name.value.trim(),
      location: e.target.location.value.trim()
    };
    EventActions.create(newEvent);
  },

  // Update the current state with the new values in the input fields
  _onChange: function(e) {
    var obj = {};
    obj[e.target.name] = e.target.value;
    this.setState(obj);
  },

  // Event handler for 'create' events coming from the EventStore
  _onCreate: function() {
    this.setState({
      name: '',
      location: '',
      result: 'Event created!'
    });
  }
});

module.exports = EventCreate;
