var React = require('react');

var ShepherdListItem = React.createClass({
  // Render each shepherd at an event
  // this.props.shepherd references the shepherd
  render: function(){
    return (
      <div className="shepherd-list-item">
        <div className="shepherd-list-item-name"><h6>{this.props.shepherd.username}</h6></div>
      </div>
    );
  }
})

module.exports = ShepherdListItem;
