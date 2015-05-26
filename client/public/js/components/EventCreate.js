var React = require('react'),
    EventStore = require('../stores/EventStore'),
    EventActions = require('../actions/EventActions');

var EventCreate = React.createClass({
  componentDidMount: function() {
    EventStore.addListener('create', this._onCreate);
  },

  render: function() {
    return (
      <div className="event-create">
        <form onSubmit={this._save}>
          <input type="text" name="name" ref="name" placeholder="Event name" />
          <input type="text" name="location" ref="location" placeholder="Event location" />
          <input type="submit" value="Submit" />
        </form>
        <div className="event-create-result" ref="event-create-result"></div>
      </div>
    );
  },

  _save: function(e) {
    e.preventDefault();
    var newEvent = {
      name: e.target.name.value.trim(),
      location: e.target.location.value.trim()
    };
    EventActions.create(newEvent);
  },

  // Event handler for 'change' events coming from the EventStore
  _onCreate: function() {
    var nameInput = React.findDOMNode(this.refs.name);
    var locationInput = React.findDOMNode(this.refs.location);
    this.setState({
      name: nameInput.value,
      location: locationInput.value
    });
    nameInput.value = '';
    locationInput.value = '';
    React.findDOMNode(this.refs['event-create-result']).textContent = 'Event created!';
  }
});

module.exports = EventCreate;
