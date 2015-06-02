var React = require('react'),
    Navigation = require('react-router').Navigation,
    EventStore = require('../stores/EventStore'),
    EventDetailStore = require('../stores/EventDetailStore'),
    AttendeeStore = require('../stores/AttendeeStore'),
    AttendeeActions = require('../actions/AttendeeActions'),
    SheepListItem = require('./SheepListItem'),
    ShepherdListItem = require('./ShepherdListItem');


var AttendeesList = React.createClass({
//mixins allows users to reuse code from different parts of
//the app even when their use cases are very different
//Navigation allows us to dynamically create hrefs in the render
//section.  Inside of mixin, we allow the entire react component
//to reference the functionalities using "this"
  mixins: [Navigation],

  getInitialState: function() {
    return {
      // Initialize empty set of attendees on initial render
      sheeps: [],
      shepherds: []
    };
  },

  componentDidMount: function() {
    AttendeeStore.addEventListener('acquiredShepherds', this._acquiredShepherds);
    AttendeeStore.addEventListener('acquiredSheep', this._acquiredSheeps);
    // Add event listener for getting observations from the server when the component is mounted

    // Fetch all observations after component is mounted
    // Fetching via AJAX needs to happen after mounting due to async
    if (this.isMounted()) {
      AttendeeActions.getAllSheepsByEvent(this.props.eventId);
      AttendeeActions.getAllShepherdsByEvent(this.props.eventId);
    }
  },

  componentWillUnmount: function() {
    // Remove event listeners when the DOM element is removed
    AttendeeStore.removeEventListener('acquiredShepherds', this._acquiredShepherds);
    AttendeeStore.removeEventListener('acquiredSheep', this._acquiredSheeps);

  },

  render: function() {
    //referenced the observations retrieved from EventDetailStore using getAllObservations()
    //sends each observation to AttendeesListItem so that it will be properly
    //displayed

    var shepherds = this.state.shepherds.map(function(shepherd, i) {
      // console.log(shepherd, 'inside of render AttendeesList')
      return <ShepherdListItem key={shepherd.id} shepherd={shepherd}/>
    });

    var sheeps = this.state.sheeps.map(function(sheep, i) {
      return <SheepListItem key={sheep.id} sheep={sheep}/>
    });
    //this.props.mode references the mode set in App.js which is made
    //possible because Event List is a child Route of App.js
    //Please reference routes.js
    //this checks to see if the user is a shepherd and only allows
    //the create button to appear is that is true
    return (
      <div className="event-list">
        <h2>Attendees</h2>
        <h3>Shepherds</h3>
        {shepherds}
        <h3>Sheeps</h3>
        {sheeps}
      </div>
    )
  },


  _acquiredShepherds: function(){
    this.setState({
      shepherds: AttendeeStore.getAllShepherd()
    })
    // console.log(this.state.shepherds, "_acquiredShepherds")
  },

  _acquiredSheeps: function(){
    this.setState({
      sheeps: AttendeeStore.getAllSheep()
    })
  },


});

module.exports = AttendeesList;
