var React = require('react'),
    Navigation = require('react-router').Navigation,
    RouteHandler = require('react-router').RouteHandler,
    EventStore = require('../stores/EventStore'),
    AppActions = require('../actions/AppActions'),
    AppStore = require('../stores/AppStore');

var App = React.createClass({
  //mixins allows users to reuse code from different parts of
  //the app even when their use cases are very different
  mixins: [Navigation],

  //the default mode for a new user is a sheep
  //users are able to change to shepherd
  getInitialState: function() {
    return {
      mode: 'sheep'
    };
  },

  //setup event listeners
  //Listens to Event store for change, executes _onChange
  //Listens to App store for toggleMode, executes _changeStateMode
  componentDidMount: function() {
    // EventStore.addEventListener('change', this._onChange);
    AppStore.addEventListener('toggleMode', this._changeStateMode);
  },

  //removes both event listeners when the dom element is removed
  componentWillUnmount: function() {
    // EventStore.removeEventListener('change', this._onChange);
    AppStore.removeEventListener('toggleMode', this._changeStateMode);
  },

  //this.makeHref('home') can be replaced with #/home
  render: function() {
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
            </ul>
          </nav>
        </header>
        <div>
          {/* The RouteHandler component renders the active child route's handler */}
          <RouteHandler mode={this.state.mode}/>
        </div>
      </div>
    );
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
