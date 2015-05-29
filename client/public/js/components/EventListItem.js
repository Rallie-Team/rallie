var React = require('react'),
	Navigation = require('react-router').Navigation,
	EventActions = require('../actions/EventActions');

//EventList item is referenced in EventList.js
//This will render all of the events in the event List
//this.props references the event that is passed in
var EventListItem = React.createClass({
  mixins: [Navigation],

  render: function() {
    return (
      <div className="event-list-item">
        <a href={this.makeHref('event-detail')} onClick={this.prepareForDetailedView}>
        <div className="event-list-item-name">{this.props.event.eventName}</div></a>
        <div className="event-list-item-location">{this.props.event.location}</div>
      </div>
    );
  },

  prepareForDetailedView: function() {
  	var updatedState = {
      name: this.props.event.name,
      location: this.props.event.location,
      mode: this.props.mode
    };
    EventActions.prepareForSegue(updatedState);
  }
});

module.exports = EventListItem;
