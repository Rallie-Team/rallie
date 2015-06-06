var React = require('react');

// Render each observation from the observation collection
// this.props.observation references the observation that is passed in from ObservationList
var ObservationListItem = React.createClass({
  render: function() {
    return (
      <div className="observation-list-item">
        <div className="observation-list-item-user">{this.props.observation.User.username}</div>
        <div className="observation-list-item-datetime">{moment(this.props.observation.createdAt).format('llll')} - {moment(this.props.observation.createdAt).fromNow()}</div>
        <div className="observation-list-item-text">{this.props.observation.content}</div>
        { this.props.observation.rawImage ? 
        <div className="observation-list-item-image center-block">
          <img className="img-circle img-border center-block img-thumbnail" src={this.props.observation.rawImage} onClick={this.showModalImage.bind(this, this.props.observation.id)}/>
          <div className="modal fade" id={'img' + this.props.observation.id} tabIndex="-1" role="dialog" aria-labelledby="observationImage" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                </div>
                <div className="modal-body">
                  <img className="center-block" src={this.props.observation.rawImage}/>
                </div>
              </div>
            </div>
          </div>
        </div> : null
        }
      </div>
    );
  },

  showModalImage: function(id) {
    $('#img' + id).modal('show');
  }
});

module.exports = ObservationListItem;
