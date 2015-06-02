var React = require('react');
//Attendee item is referenced in ObservationList.js
//This will render all of the users at an the event
//this.props references the event that is passed in

var SheepListItem = React.createClass({

  render: function(){
    return (
      <div className="sheep-list-item">
        <div className="sheep-list-item-name">{this.props.sheep.username}</div>
      </div>
    );
  }
})

module.exports = SheepListItem;
