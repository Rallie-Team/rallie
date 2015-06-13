var React = require('react'),
	  Navigation = require('react-router').Navigation,
	  EventActions = require('../../actions/EventActions');

// EventListItem is referenced in EventList.js
// This will render each event in the event list
// this.props.event references the event that is passed in
var EventListItem = React.createClass({
  mixins: [Navigation],

  render: function() {
    return (
      <div className={'event-list-item' + (this.props.isParticipating ? ' event-list-item-participating' : '')}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-7">
              <div className="event-list-item-name">
                <a href={this.makeHref('event-detail', {eventId: this.props.event.id})} onClick={this._setCurrentEvent}>{this.props.event.name}</a>
              </div>
            </div>
            <div className="col-md-5">
              <div className="event-list-item-location text-right">{this.props.event.location}</div>
              <div className="event-list-item-datetime text-right">
                {moment(this.props.event.start).format('lll')}&ndash;{moment(this.props.event.end).format('lll')}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },

  _setCurrentEvent: function() {
    EventActions.setCurrentEvent(this.props.event);
  }
});

module.exports = EventListItem;
