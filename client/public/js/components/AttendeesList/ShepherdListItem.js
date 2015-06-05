var React = require('react');

var ShepherdListItem = React.createClass({
  // Render each shepherd at an event
  // this.props.shepherd references the shepherd
  render: function(){
    return (
      <div className="shepherd-list-item">
        <div className="shepherd-list-item-name">{this.props.shepherd.username}</div>
      </div>
    );
  }
})

module.exports = ShepherdListItem;
