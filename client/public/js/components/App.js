var React = require('react'),
    Navigation = require('react-router').Navigation,
    RouteHandler = require('react-router').RouteHandler,
    EventStore = require('../stores/EventStore'),
    AppActions = require('../actions/AppActions'),
    AppStore = require('../stores/AppStore');

var App = React.createClass({
  //mixins allows users to reuse code from different parts of
  //the app even when their use cases are very different
  //Navigation allows us to dynamically create hrefs in the render
  //section.  Inside of mixin, we allow the entire react component
  //to reference the functionalities using "this"
  mixins: [Navigation],

  getParameterByName: function(name){
  var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  },

  //the default mode for a new user is a sheep
  //users are able to change to shepherd
  getInitialState: function() {
    return {
      currentUser: undefined,
      mode: 'sheep'
    };
  },

  _loggedIn: function(){
      this.setState({
        currentUser: AppStore.getCurrentUser()
    });
  },

  _logout: function(){
    this.setState({
      currentUser: getCurrentUser()
    });
  },

  //setup event listeners
  //Listens to Event store for change, executes _onChange
  //Listens to App store for toggleMode, executes _changeStateMode
  componentDidMount: function() {
    // EventStore.addEventListener('change', this._onChange);
    AppStore.addEventListener('toggleMode', this._changeStateMode);
    AppStore.addEventListener('loggedIn', this._loggedIn);

    if(this.getParameterByName("user")){
      var username = this.getParameterByName("user");
      var id = this.getParameterByName('id');
      var token = this.getParameterByName("token");

      var data = {
        username: username,
        id: id,
        token: token
      };
    AppActions.setCurrentUser(data);
    }
  },

  //removes both event listeners when the dom element is removed
  componentWillUnmount: function() {
    // EventStore.removeEventListener('change', this._onChange);
    AppStore.removeEventListener('toggleMode', this._changeStateMode);
    AppStore.removeEventListener('loggedIn', this._loggedIn);

  },

  //this.makeHref('home') can be replaced with #/home
  render: function() {
    if(AppStore.getCurrentUser() !== undefined){
      return (
        <div>
          <header>
            <h1>Joseki</h1>
            <nav>
              <ul>
                <li><a href={this.makeHref('home')}>Home</a></li>
                <li><a href={this.makeHref('events')}>Events</a></li>
                {/* This is the toggler for shepherd/sheep */}
                <li><button onClick={this._changeMode}>{this.state.mode === 'shepherd' ? 'Sheep' : 'Shepherd'}</button></li>
                <li>{this.state.currentUser}</li>
              </ul>
            </nav>
          </header>

            {/* The RouteHandler component renders the active child route's handler */}
            <RouteHandler mode={this.state.mode}/>
        </div>
    );

    } else {

      return (
        <div>
          <header>
            <h1>Joseki</h1>
            <nav>
              <ul>
                <li><a href={this.makeHref('home')}>Home</a></li>
                <li><a href={this.makeHref('events')}>Events</a></li>
                <li><a href='/Server/auth/facebook'>Login</a></li>
                {/* This is the toggler for shepherd/sheep */}
                <li><button onClick={this._changeMode}>{this.state.mode === 'shepherd' ? 'Sheep' : 'Shepherd'}</button></li>
              </ul>
            </nav>
          </header>

            {/* The RouteHandler component renders the active child route's handler */}
            <RouteHandler mode={this.state.mode}/>
          </div>
      );

    }

  },

  // Event handler for 'change' events coming from the EventStore
  // This is referenced in componentDidMount and componentWillUnmount
  //removed because app arch changed.  getEventState is now in EventList.js
  _onChange: function() {
    // this.setState(getEventState());
  },

  // Notifies App Action to change the state.mode
  _changeMode: function() {
    AppActions.toggleMode(this.state.mode === 'shepherd' ? 'sheep' : 'shepherd', this.state.userId);
  },

  //updates the views when the state mode changes from sheep to shepherd of vise versa
  _changeStateMode: function() {
    this.setState({
      mode: this.state.mode === 'shepherd' ? 'sheep' : 'shepherd'
    });
  }
});

module.exports = App;
