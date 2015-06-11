var React = require('react'),
    Router = require('react-router'),
    Navigation = Router.Navigation,
    State = Router.State,
    RouteHandler = Router.RouteHandler,
    AppActions = require('../actions/AppActions'),
    AppStore = require('../stores/AppStore'),
    cookie = require('react-cookie');

var App = React.createClass({
  /*
    Mixins allows users to reuse code from different parts of
    the app even when their use cases are very different.

    Navigation allows us to dynamically create hrefs in the render section.

    State allows us to check what the current router state is,
    and if the user is in the event-create or event-detail routes,
    disable the button for toggling the mode.

    With the mixins property, we allow the entire React component
    to reference all the enclosed functionalities using "this".
  */
  mixins: [Navigation, State],

  // The default mode for a new user is a sheep
  // Users are able to change to shepherd by clicking a toggle button
  getInitialState: function() {
    return {
      currentUser: undefined,
      mode: AppStore.getCurrentMode()
    };
  },

  //sets current user as logged in after they successfully log into facebook
  _loggedIn: function(){
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

    var username = cookie.load("username");
    var id = cookie.load('id');

    var data = {
      username: username,
      id: id
    };
    // console.log(data);
    AppActions.setCurrentUser(data);
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
    if (cookie.load("username") !== undefined) {
      var currentUserLi;
      if (this.state.currentUser && this.state.currentUser.username) {
        currentUserLi = <p className="navbar-text">Hi, {this.state.currentUser.username}</p>
      }
      return (
        <div>
          <header>
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                {/* Brand and toggle get grouped for better mobile display */}
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-1">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                  <a className="navbar-brand" href={this.makeHref('events')}><img className="navbar-logo" alt="Rallie Logo" src="/assets/images/megaphone.png"/></a>
                </div>

                {/* Collect the nav links for toggling */}
                <div className="collapse navbar-collapse" id="navbar-collapse-1">
                  <ul className="nav navbar-nav">
                    <p className={'navbar-text ' + (this.state.mode === 'shepherd' ? 'pink' : 'teal')}>{this.state.mode === 'shepherd' ? 'Host' : 'Participate'}</p>
                    {/*
                      This is the toggler for shepherd/sheep.
                      It will be disabled when viewing the event-create and event-detail components
                    */}
                    <li>
                      <button className={'btn navbar-btn btn-' + (this.state.mode === 'shepherd' ? 'teal' : 'pink')} onClick={this._changeMode}
                        disabled={this.isActive('event-create') || this.isActive('event-detail') ? 'disabled' : false}>
                        Change
                      </button>
                    </li>
                  </ul>
                  <ul className="nav navbar-nav navbar-right">
                    {currentUserLi}
                    <li><a onClick={this.removeCurrentUser} href={this.makeHref('home')}>Logout</a></li>
                  </ul>
                </div>
              </div>
            </nav>
          </header>

          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-10 col-lg-offset-1">
                {/* The RouteHandler component renders the active child route's handler */}
                <RouteHandler/>
              </div>
            </div>
          </div>

          <footer>
            <div className="navbar navbar-default">
              <div className="container-fluid">
                <img className="navbar-left footer-logo" alt="Rallie Logo" src="/assets/images/megaphone-48x48.png"/>
                <p className="navbar-text footer-rallie">Rallie</p>
                <ul className="nav navbar-nav footer-nav">
                  <li><a href={this.makeHref('team')}>Team</a></li>
                  <li><a href={this.makeHref('contact')}>Contact</a></li>
                </ul>
                <p className="navbar-text navbar-right">Made at Hack Reactor</p>
              </div>
            </div>
          </footer>
        </div>
      );
    } else {
      this.transitionTo('/');
      return (
        <div>
          <header>
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                {/* Brand and toggle get grouped for better mobile display */}
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-1">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                  <a className="navbar-brand" href="#"><img className="navbar-logo" alt="Rallie Logo" src="/assets/images/megaphone.png"/></a>
                </div>

                {/* Collect the nav links for toggling */}
                <div className="collapse navbar-collapse" id="navbar-collapse-1">
                  <ul className="nav navbar-nav">
                    <li><a id="brand" href="#">Rallie</a></li>
                  </ul>
                  <ul className="nav navbar-nav navbar-right">
                    {/*
                      This is the toggler for shepherd/sheep.
                      It will be disabled when viewing the event-create and event-detail components
                    */}
                    <li><a className="login" href="/auth/facebook">Login</a></li>
                  </ul>
                </div>
              </div>
            </nav>
          </header>
          <div className="jumbotron">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-6 megaphone"></div>
                <div className="col-md-6">
                  <h1>Rallie</h1>
                  <p>Real-time event collaboration</p>
                  <a className="login" href="/auth/facebook">Log In / Sign Up with Facebook</a>
                </div>
              </div>
            </div>
          </div>

          <div className="container-fluid">
            <div className="row landing-page-description">
              <div className="col-md-10 col-md-offset-1">
                <div className="row">
                  <div className="col-md-4">
                    Rallie is a platform that makes creating and hosting events easier.
                    It closes the communication gap between hosts and participants so they can collaborate on those events in real-time.
                    Typically, this is hard; it is difficult to manage uncertainty.
                  </div>
                  <div className="col-md-4">
                    Event hosts put a great deal of effort into ensuring an event runs smoothly.
                    Participants are not willing to get involved without a clear understanding of what’s going on.
                    Once something unexpected happens, all hell could break loose.
                  </div>
                  <div className="col-md-4">
                    When participants and hosts can seamlessly share information, hosts can act and direct participants to respond accordingly.
                    Rallie provides this communication channel so people can effectively rally together.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <img className="how-it-works" src="/assets/images/how-it-works.png" alt="How it works"/>
          </div>

          <footer className="landing-page-footer">
            <div className="navbar navbar-default">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-sm-12 col-md-2">
                    <div>
                      <img className="navbar-left footer-logo" alt="Rallie Logo" src="/assets/images/megaphone-48x48.png"/>
                      <p className="navbar-text footer-rallie">Rallie</p>
                    </div>
                    <div>
                      <ul className="list-unstyled footer-nav">
                        <li>Team</li>
                        <li>Contact</li>
                      </ul>
                    </div>
                  </div>

                  <div className="col-sm-12 col-md-9 col-md-offset-1">
                    <div>Made at Hack Reactor and powered by</div>
                    <div className="landing-page-footer-tech-stack center-block">
                      <img src="/assets/images/react-logo.png" alt="React"/>
                      <img src="/assets/images/flux-logo.png" alt="Flux"/>
                      <img src="/assets/images/node-logo.png" alt="Node.js"/>
                      <img src="/assets/images/postgresql-logo.png" alt="PostgreSQL"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      );
    }
  },

  // Notifies AppAction to change the state.mode
  _changeMode: function() {
    AppActions.toggleMode(this.state.mode === 'shepherd' ? 'sheep' : 'shepherd');
  },

  // Updates the views when the state mode changes from sheep to shepherd and vice versa
  _changeStateMode: function() {
    this.setState({
      mode: AppStore.getCurrentMode()
    });
  }
});

module.exports = App;