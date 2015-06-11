var React = require('react');

var SheepListItem = React.createClass({
  // Render each sheep at an event
  // this.props.sheep references the sheep
  render: function(){
    return (
      <div className="sheep-list-item">
        <div className="sheep-list-item-name">{this.props.sheep.username}</div>
      </div>
    );
  }
})

module.exports = SheepListItem;
