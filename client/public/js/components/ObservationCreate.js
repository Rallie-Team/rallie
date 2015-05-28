var React = require('react'),
    Navigation = require('react-router').Navigation,
    AppStore = require('../stores/AppStore'),
    EventDetailStore = require('../stores/EventDetailStore'),
    EventDetailActions = require('../actions/EventDetailActions');

var ObservationCreate = React.createClass({
  mixins: [Navigation],

  //initially sets the text of the observation form to blank
  //will be filed in the form
  getInitialState: function() {
    return {
      name: AppStore.getCurrentUser(),
      text: ''
    };
  },

  //Clears default values after observation is created
  componentDidMount: function() {
    EventDetailStore.addEventListener('create', this._onCreate);
  },

  //Clears eventlistener when dom node is deleted
  componentWillUnmount: function() {
    EventDetailStore.removeEventListener('create', this._onCreate);
  },

  //asks for users inputs if they want to create an event
  render: function() {
    return (
      <div className="event-create">
        <form onSubmit={this._save}>
          <input type="text" name="text" placeholder="Your Observation" value={this.state.text} onChange={this._onChange} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  },

  // Add new observation to the state and database
  // .target references the dom node of e
  _save: function(e) {
    e.preventDefault();
    console.log(this.state.name);
    var newObservation = {
      name: this.state.name,
      text: e.target.text.value.trim()
    };
    EventDetailActions.createNewObservation(newObservation);
  },

  // Update the current state with the new values in the input fields
  // every time the user types a letter
  // this updates the state values that were defined in getInitialState
  _onChange: function(e) {
    var obj = {};
    console.log(e.target, "targeted node");
    obj[e.target.name] = e.target.value;
    this.setState(obj);
  },

  // Event handler for 'create' observations coming from the EventDetailStore
  // clears default values of name and location
  _onCreate: function() {
    this.setState({
      name: AppStore.getCurrentUser(),
      text: ''
    });
  }
});

module.exports = ObservationCreate;
