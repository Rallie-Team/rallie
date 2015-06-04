var React = require('react'),
    Navigation = require('react-router').Navigation,
    ObservationListItem = require('./ObservationListItem'),
    ObservationStore = require('../stores/ObservationStore'),
    ObservationActions = require('../actions/ObservationActions');

var intervalId;

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
      observations: []
    };
  },

  componentDidMount: function() {
    // Add event listener for getting observations from the server when the component is mounted
    ObservationStore.addEventListener('get', this._onGet);
    // Add event listener on observation creation
    ObservationStore.addEventListener('create', this._onCreate);

    // Fetch all observations after component is mounted
    // Fetching via AJAX needs to happen after mounting due to async
    if (this.isMounted()) {
      ObservationActions.getAllByEvent(this.props.eventId);
      intervalId = setInterval(function(){
        ObservationActions.getAllByEvent(this.props.eventId);
      }.bind(this), 2000)
    }
  },

  componentWillUnmount: function() {
    // Remove event listeners when the DOM element is removed
    ObservationStore.removeEventListener('get', this._onGet);
    ObservationStore.removeEventListener('create', this._onCreate);
    clearInterval(intervalId);
  },

  render: function() {
    //referenced the observations retrieved from EventDetailStore using getAllObservations()
    //sends each observation to ObservationListItem so that it will be properly
    //displayed
    var observations = this.state.observations.map(function(observation, i) {
      return <ObservationListItem key={observation.id} observation={observation}/>
    });

    return (
      <div className="event-list">
        <h2>Observations</h2>
        {observations}
      </div>
    );
  },

  _onGet: function() {
    this.setState({
      observations: ObservationStore.getAll()
    });
  },

  _onCreate: function() {
    this.setState({
      observations: ObservationStore.getAll()
    });
  }
});

module.exports = ObservationList;