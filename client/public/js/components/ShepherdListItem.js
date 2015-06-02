var React = require('react');
//Attendee item is referenced in ObservationList.js
//This will render all of the users at an the event
//this.props references the event that is passed in

var ShepherdListItem = React.createClass({

  render: function(){
    return (
      <div className="shepherd-list-item">
        <div className="shepherd-list-item-name">{this.props.shepherd.username}</div>
      </div>
    );
  }
})

module.exports = ShepherdListItem;
