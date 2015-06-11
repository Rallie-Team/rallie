var React = require('react'),
    Navigation = require('react-router').Navigation,
    EventStore = require('../../stores/EventStore'),
    EventActions = require('../../actions/EventActions'),
    AppStore = require('../../stores/AppStore');

var Team = React.createClass({
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
  },

  //sets current user as logged in after they successfully log into facebook

  //setup event listeners
  //Listens to App store for toggleMode, executes _changeStateMode
  componentDidMount: function() {
  },

  //removes event listener when the dom element is removed
  componentWillUnmount: function() {
  },

  //this.makeHref('home') can be replaced with #/home
  //Depending on if the user is logged in (based off the url)
  //the application will determine which parts of the render function
  //to be displayed
  render: function() {
      return (
        <div>
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
                        <li><a className="team" href={this.makeHref('team')}>Team</a></li>
                        <li><a className="contact" href={this.makeHref('contact')}>Contact</a></li>
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
});

module.exports = Team;