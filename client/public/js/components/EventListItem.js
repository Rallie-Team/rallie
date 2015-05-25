var React = require('react');

var EventListItem = React.createClass({
  render: function() {
    return (
      <div className="event-list-item">
        <div className="event-list-item-name">{this.props.event.name}</div>
        <div className="event-list-item-location">{this.props.event.location}</div>
      </div>
    );
  }
});

module.exports = EventListItem;
