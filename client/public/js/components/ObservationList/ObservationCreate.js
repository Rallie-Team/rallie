var React = require('react'),
    AppStore = require('../../stores/AppStore'),
    ObservationStore = require('../../stores/ObservationStore'),
    ObservationActions = require('../../actions/ObservationActions');

var ObservationCreate = React.createClass({
  getInitialState: function() {
    // Initially sets the text field of the observation form to blank
    // will be filed in the form
    return {
      userId: AppStore.getCurrentUser().id,
      username: AppStore.getCurrentUser().username,
      content: '',
      image: '../../../assets/images/noimage.gif'
    };
  },

  componentDidMount: function() {
    // Clears default values after observation is created
    ObservationStore.addEventListener('create', this._onCreate);
  },

  componentWillUnmount: function() {
    // Clears eventlistener when dom node is deleted
    ObservationStore.removeEventListener('create', this._onCreate);
  },

  // asks for users inputs if they want to create an observation
  render: function() {
    return (
      <div className="observation-create container-fluid">
        <form className="observationCreateForm" onSubmit={this._save}>
          <div className="row">
            <div className="col-md-8 well">
              <div className="row">
                <div className="col-md-7 observation-box-style">
                  <div className="form-group">
                    <textarea className="inputBox form-control observation-input" type="text" name="content" placeholder="Type something" value={this.state.content} onChange={this._onChange} />
                  </div>
                </div>

                <div className="col-md-5">
                  <div className="row">
                    <div className="col-xs-3 no-padding">
                      <img id="uploaded-picture" src={this.state.image}/>
                    </div>

                    <div className="col-xs-3 no-padding">
                      <div id="upload-file-container">
                        <button><input type="file" id="take-picture" accept="image/*" ref="camera" onChange={this.handleFiles}/></button>
                      </div>
                    </div>

                    <div className="col-xs-6 no-padding">
                      <button className="btn btn-default inputBox edit-buttons" type="submit">Submit</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  },

  handleFiles: function(e){
    var files = e.target.files,
        file;
    if (files && files.length > 0) {
        file = files[0];
    }
    var imgUrl = window.URL.createObjectURL(file);
    this.convert(file, imgUrl);
  },

  convert: function (blob, url) {
    var reader = new FileReader();

    reader.onloadend = function () {
      this.setState({
        image: reader.result,
        rawImage: reader.result
      })
    }.bind(this);

    reader.readAsDataURL(blob);
  },

  // Add new observation to the database
  // .target references the dom node of e
  _save: function(e) {
    e.preventDefault();
    var newObservation = {
      userId: this.state.userId,
      eventId: this.props.eventId,
      content: this.state.content,
      rawImage: this.state.rawImage
    };
    ObservationActions.create(newObservation);
    this._onCreate();
  },

  // Update the current state with the new values in the input fields
  // every time the user types a letter
  // this updates the state values that were defined in getInitialState
  _onChange: function(e) {
    var obj = {};
    obj[e.target.name] = e.target.value;
    this.setState(obj);
  },

  // Event handler for 'create' observations coming from the ObservationStore
  // Clears the input field on the observation form
  _onCreate: function() {
    this.setState({
      content: '',
      image: '../../../assets/images/noimage.gif',
      rawImage: undefined
    });
  }
});

module.exports = ObservationCreate;
