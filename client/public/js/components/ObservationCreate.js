var React = require('react'),
    AppStore = require('../stores/AppStore'),
    ObservationStore = require('../stores/ObservationStore'),
    ObservationActions = require('../actions/ObservationActions');

var ObservationCreate = React.createClass({
  getInitialState: function() {
    // Initially sets the text field of the observation form to blank
    // will be filed in the form
    return {
      userId: AppStore.getCurrentUser().id,
      username: AppStore.getCurrentUser().username,
      content: ''
    };
  },

  componentDidMount: function() {
    // Clears default values after observation is created
    ObservationStore.addEventListener('create', this._onCreate);
  },

  componentWillUnmount: function() {
    // Clears eventlistener when dom node is deleted
    ObservationStore.removeEventListener('create', this._onCreate);
  },

  // asks for users inputs if they want to create an observation
  render: function() {
    return (
      <div className="event-create">
        <form className="observationCreateForm" onSubmit={this._save}>
          <input className="inputBox" type="text" name="content" placeholder="Your Observation" value={this.state.content} onChange={this._onChange} />
          <input className="inputBox" type="submit" value="Submit" />
        </form>
      </div>
    );
  },

  // Add new observation to the database
  // .target references the dom node of e
  _save: function(e) {
    e.preventDefault();
    var newObservation = {
      userId: this.state.userId,
      eventId: this.props.eventId,
      content: this.state.content
    };
    ObservationActions.create(newObservation);
  },

  // Update the current state with the new values in the input fields
  // every time the user types a letter
  // this updates the state values that were defined in getInitialState
  _onChange: function(e) {
    var obj = {};
    obj[e.target.name] = e.target.value;
    this.setState(obj);
  },

  // Event handler for 'create' observations coming from the ObservationStore
  // Clears the input field on the observation form
  _onCreate: function() {
    this.setState({
      content: ''
    });
  }
});

module.exports = ObservationCreate;
