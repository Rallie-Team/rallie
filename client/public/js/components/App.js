var React = require('react'),
    Navigation = require('react-router').Navigation,
    RouteHandler = require('react-router').RouteHandler,
    EventStore = require('../stores/EventStore'),
    AppActions = require('../actions/AppActions'),
    AppStore = require('../stores/AppStore');

var App = React.createClass({
  mixins: [Navigation],

  getInitialState: function() {
    return {
      mode: 'sheep'
    };
  },

  componentDidMount: function() {
    EventStore.addEventListener('change', this._onChange);
    AppStore.addEventListener('toggleMode', this._changeStateMode);
  },

  componentWillUnmount: function() {
    EventStore.removeEventListener('change', this._onChange);
    AppStore.removeEventListener('toggleMode', this._changeStateMode);
  },

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
  _onChange: function() {
    this.setState(getEventState());
  },

  _changeMode: function() {
    AppActions.toggleMode(this.state.mode === 'shepherd' ? 'sheep' : 'shepherd', this.state.userId);
  },

  _changeStateMode: function() {
    this.setState({
      mode: this.state.mode === 'shepherd' ? 'sheep' : 'shepherd'
    });
  }
});

module.exports = App;
