var React = require('react'),
    Router = require('react-router');

var routes = require('./routes');

// Create new router using HashLocation by default
var router = Router.create({routes: routes});

// Run router
// .run() takes a callback function whose first argument 
// represents a ReactComponent class with the current match
// all wrapped up inside it, ready to render
router.run(function(Handler) {
  // Render the main app view within div#app
  React.render(
    <Handler/>,
    document.getElementById('app')
  );
});
