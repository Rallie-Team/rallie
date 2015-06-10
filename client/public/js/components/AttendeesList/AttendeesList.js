var React = require('react'),
    Navigation = require('react-router').Navigation,
    AttendeeStore = require('../../stores/AttendeeStore'),
    AttendeeActions = require('../../actions/AttendeeActions'),
    SheepListItem = require('./SheepListItem'),
    ShepherdListItem = require('./ShepherdListItem');

var intervalId;

var AttendeesList = React.createClass({
  getInitialState: function() {
    return {
      // Initialize empty set of attendees on initial render
      sheeps: [],
      shepherds: []
    };
  },

  componentDidMount: function() {
    // Add event listeners for getting attendees from the server when the component is mounted
    AttendeeStore.addEventListener('acquiredShepherds', this._acquiredShepherds);
    AttendeeStore.addEventListener('acquiredSheep', this._acquiredSheeps);

    // Fetch all sheep and shepherds for the event after component is mounted
    // Fetching via AJAX needs to happen after mounting due to async
    if (this.isMounted()) {
      AttendeeActions.getAllSheepsByEvent(this.props.eventId);
      AttendeeActions.getAllShepherdsByEvent(this.props.eventId);
      intervalId = setInterval(function(){
        AttendeeActions.getAllSheepsByEvent(this.props.eventId);
        AttendeeActions.getAllShepherdsByEvent(this.props.eventId);
      }.bind(this), 2000);
    }
  },

  componentWillUnmount: function() {
    // Remove event listeners when the DOM element is removed
    AttendeeStore.removeEventListener('acquiredShepherds', this._acquiredShepherds);
    AttendeeStore.removeEventListener('acquiredSheep', this._acquiredSheeps);
    clearInterval(intervalId);
  },

  render: function() {
    // Render each shepherd using the ShepherdListItem component
    var shepherds = this.state.shepherds.map(function(shepherd) {
      // console.log(shepherd, 'inside of render AttendeesList')
      return <ShepherdListItem key={shepherd.id} shepherd={shepherd}/>
    });

    // Render each sheep using the SheepListItem component
    var sheeps = this.state.sheeps.map(function(sheep) {
      return (
        <tr>
          <SheepListItem key={sheep.id} sheep={sheep}/>
        </tr>
      );
    });

    return (
      <div className="event-list">
        <div className="row">
        <div className="col-xs-6">
          <table>
            <tr>
              <h4 className="attendees-table-header">Host</h4>
            </tr>
            {shepherds}
          </table>
          </div>
        <div className="col-xs-6">
          <table>
            <tr>
              <h4 className="attendees-table-header">Participants</h4>
            </tr>
            {sheeps}
          </table>
        </div>
        </div>
      </div>
    )
  },

  _acquiredShepherds: function(){
    this.setState({
      shepherds: AttendeeStore.getAllShepherd()
    })
  },

  _acquiredSheeps: function(){
    this.setState({
      sheeps: AttendeeStore.getAllSheep()
    })
  },
});

module.exports = AttendeesList;
