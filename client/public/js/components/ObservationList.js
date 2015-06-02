var React = require('react'),
    Navigation = require('react-router').Navigation,
    ObservationListItem = require('./ObservationListItem'),
    EventStore = require('../stores/EventStore'),
    EventDetailStore = require('../stores/EventDetailStore'),
    ObservationStore = require('../stores/ObservationStore'),
    ObservationActions = require('../actions/ObservationActions'),
    AttendeeStore = require('../stores/AttendeeStore'),
    AttendeeActions = require('../actions/AttendeeActions'),
    SheepListItem = require('./SheepListItem'),
    ShepherdListItem = require('./ShepherdListItem');


var ObservationList = React.createClass({
//mixins allows users to reuse code from different parts of
//the app even when their use cases are very different
//Navigation allows us to dynamically create hrefs in the render
//section.  Inside of mixin, we allow the entire react component
//to reference the functionalities using "this"
  mixins: [Navigation],

  getInitialState: function() {
    return {
      // Initialize empty set of observations on initial render
      observations: [],
      sheeps: [],
      shepherds: []
    };
  },

  componentDidMount: function() {
    AttendeeStore.addEventListener('aquiredShepherds', this._acquiredShepherds);
    AttendeeStore.addEventListener('acquiredSheep', this._acquiredSheeps);
    // Add event listener for getting observations from the server when the component is mounted
    ObservationStore.addEventListener('get', this._onGet);
    // Add event listener on observation creation
    ObservationStore.addEventListener('create', this._onCreate);

    // Fetch all observations after component is mounted
    // Fetching via AJAX needs to happen after mounting due to async
    if (this.isMounted()) {
      ObservationActions.getAllByEvent(this.props.eventId);
      AttendeeActions.getAllSheepsByEvent(this.props.eventId);
      AttendeeActions.getAllShepherdsByEvent(this.props.eventId);
    }
  },

  componentWillUnmount: function() {
    // Remove event listeners when the DOM element is removed
    AttendeeStore.removeEventListener('aquiredShepherds', this._acquiredShepherds);
    AttendeeStore.removeEventListener('acquiredSheep', this._acquiredSheeps);

    ObservationStore.removeEventListener('get', this._onGet);
    ObservationStore.removeEventListener('create', this._onCreate);
  },

  render: function() {
    //referenced the observations retrieved from EventDetailStore using getAllObservations()
    //sends each observation to ObservationListItem so that it will be properly
    //displayed
      console.log(this.state.observations, '--------------------');
    var observations = this.state.observations.map(function(observation, i) {
      return <ObservationListItem key={observation.id} observation={observation}/>
    })

    var shepherds = this.state.shepherds.map(function(shepherd, i) {
      console.log(shepherd, 'inside of render ObservationList')
      return <ShepherdListItem key={shepherd.id} shepherd={shepherd}/>
    });

      var sheeps = this.state.sheeps.map(function(sheep, i) {
        return <SheepListItem key={sheep.id} sheep={sheep}/>
    }
    //this.props.mode references the mode set in App.js which is made
    //possible because Event List is a child Route of App.js
    //Please reference routes.js
    //this checks to see if the user is a shepherd and only allows
    //the create button to appear is that is true
    return (
      <div className="event-list">
        <h2>Observations</h2>
        {observations}
        <h2>Attendees</h2>
        <h3>Shepherds</h3>
        {shepherds}
        <h3>Sheeps</h3>
        {sheeps}
      </div>
    );
  },

  _onGet: function() {
    this.setState({
      observations: ObservationStore.getAll()
    });
  },

  _acquiredShepherds: function(){
    this.setState({
      shepherds: AttendeeStore.getAllShepherd()
    })
    console.log(this.state.shepherds, "_acquiredShepherds")
  },

  _acquiredSheeps: function(){
    this.setState({
      sheeps: AttendeeStore.getAllSheep()
    })
  },

  _onCreate: function() {
    this.setState({
      observations: ObservationStore.getAll()
    });
  }
});

module.exports = ObservationList;
