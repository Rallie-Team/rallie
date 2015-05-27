var React = require('react'),
    Navigation = require('react-router').Navigation,
    ObservationListItem = require('./ObservationListItem'),
    EventDetailStore = require('../stores/EventDetailStore');

var ObservationList = React.createClass({
//mixins allows users to reuse code from different parts of
//the app even when their use cases are very different
//Navigation allows us to dynamically create hrefs in the render
//section.  Inside of mixin, we allow the entire react component
//to reference the functionalities using "this"
  mixins: [Navigation],

  getInitialState: function() {
    return {
      observations: EventDetailStore.getAllObservations()
    }
  },

  render: function() {
    //referenced the observations retrieved from EventDetailStore using getAllObservations()
    //sends each observation to ObservationListItem so that it will be properly
    //displayed
    var observations = this.state.observations.map(function(obs, i) {
      return <ObservationListItem key={i} observation={obs}/>
    });

    //this.props.mode references the mode set in App.js which is made
    //possible because Event List is a child Route of App.js
    //Please reference routes.js
    //this checks to see if the user is a shepherd and only allows
    //the create button to appear is that is true
    return (
      <div className="event-list">
        <h2>Observations</h2>
        {observations}
      </div>
    );
  }
});

module.exports = ObservationList;
