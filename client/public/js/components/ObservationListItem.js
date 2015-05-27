var React = require('react');

//EventList item is referenced in EventList.js
//This will render all of the events in the event List
//this.props references the event that is passed in
var ObservationListItem = React.createClass({

  render: function() {
    return (
      <div className="event-list-item">
        <div className="event-list-item-name">{this.props.observation.name}</div>
        <div className="event-list-item-location">{this.props.observation.text}</div>
      </div>
    );
  }

});

module.exports = ObservationListItem;
