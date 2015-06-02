var React = require('react');
//Attendee item is referenced in ObservationList.js
//This will render all of the users at an the event
//this.props references the event that is passed in

var AttendeeListItem = React.createClass({

  render: function(){
    return (
      <div className="attendee-list-item">
        <div className="attendee-list-item-name">{this.props.attendee.name}</div>
      </div>
    );
  }
})

module.exports = AttendeeListItem;
