var React = require('react'),
    Navigation = require('react-router').Navigation,
    RouteHandler = require('react-router').RouteHandler,
    AppActions = require('../actions/AppActions'),
    AppStore = require('../stores/AppStore');

var App = React.createClass({
  // Mixins allows users to reuse code from different parts of
  // the app even when their use cases are very different.
  // Navigation allows us to dynamically create hrefs in the render
  // section. With the mixins property, we allow the entire React component
  // to reference all the enclosed functionalities using "this".
  mixins: [Navigation],

  getParameterByName: function(name){
  var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  },

  // The default mode for a new user is a sheep
  // Users are able to change to shepherd by clicking a toggle button
  getInitialState: function() {
    return {
      currentUser: undefined,
      mode: 'sheep'
    };
  },

  //sets current user as logged in after they successfully log into facebook
  _loggedIn: function(){
    console.log('inside of app.js loggedIn')
      this.setState({
        currentUser: AppStore.getCurrentUser()
    });
  },

  // sets state of current user to undefined after they click the logout
  // button
  _loggedOut: function(){
    this.setState({
      currentUser: AppStore.getCurrentUser()
    });
  },

  //Relays information to Event Store so that current user information can
  //be set to be undefined

  removeCurrentUser: function(){
    AppActions.removeCurrentUser();
  },

  //setup event listeners
  //Listens to App store for toggleMode, executes _changeStateMode
  componentDidMount: function() {
    AppStore.addEventListener('toggleMode', this._changeStateMode);
    AppStore.addEventListener('loggedIn', this._loggedIn);
    AppStore.addEventListener('loggedOut', this._loggedOut);

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

  //removes event listener when the dom element is removed
  componentWillUnmount: function() {
    AppStore.removeEventListener('toggleMode', this._changeStateMode);
    AppStore.removeEventListener('loggedIn', this._loggedIn);
    AppStore.removeEventListener('loggedOut', this._loggedOut);

  },

  //this.makeHref('home') can be replaced with #/home
  //Depending on if the user is logged in (based off the url)
  //the application will determine which parts of the render function
  //to be displayed
  render: function() {
    if(this.getParameterByName("user")){
      var currentUserLi;
      if (this.state.currentUser && this.state.currentUser.username) {
        currentUserLi = <li>{this.state.currentUser.username}</li>
      }
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
                {currentUserLi}
                <li><a onClick={this.removeCurrentUser} href={this.makeHref('home')}>Logout</a></li>
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
                <li><a href='/Server/auth/facebook'>Login</a></li>
              </ul>
            </nav>
          </header>

            {/* The RouteHandler component renders the active child route's handler */}
            <RouteHandler mode={this.state.mode}/>
          </div>
      );

    }

  },

  // Notifies AppAction to change the state.mode
  _changeMode: function() {
    AppActions.toggleMode(this.state.mode === 'shepherd' ? 'sheep' : 'shepherd', this.state.userId);
  },

  // Updates the views when the state mode changes from sheep to shepherd and vice versa
  _changeStateMode: function() {
    this.setState({
      mode: this.state.mode === 'shepherd' ? 'sheep' : 'shepherd'
    });
  }
});

module.exports = App;