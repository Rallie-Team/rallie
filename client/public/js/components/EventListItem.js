var React = require('react'),
	  Navigation = require('react-router').Navigation,
	  EventActions = require('../actions/EventActions'),
    assign = require('object-assign');

//EventList item is referenced in EventList.js
//This will render all of the events in the event List
//this.props references the event that is passed in
var EventListItem = React.createClass({
  mixins: [Navigation],

  render: function() {
    return (
      <div className="event-list-item">
        <a href={this.makeHref('event-detail')} onClick={this.prepareForDetailedView}>
        <div className="event-list-item-name">{this.props.event.name}</div></a>
        <div className="event-list-item-location">{this.props.event.location}</div>
      </div>
    );
  },

  prepareForDetailedView: function() {
    // Merge all keys in this.props.event and this.props.mode into one object
    var updatedState = assign(this.props.event, {mode: this.props.mode});
    EventActions.prepareForSegue(updatedState);
  }
});

module.exports = EventListItem;
