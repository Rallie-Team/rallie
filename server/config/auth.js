// used for logging incoming request
var morgan = require('morgan');
var allowCors = require('./cors.js');
var bodyParser = require('body-parser');
//ensures all requests are stored in the body.

module.exports = function (app, express, passport) {

  //initiates an auth Router
  var authRouter = express.Router();

  //logs all requests
  app.use(morgan('dev'));

  //takes the data from the url and puts it into the body
  app.use(bodyParser.urlencoded({extended: true}));

  //ensures that all responses be stored in the body and only parses JSON data
  app.use(bodyParser.json());

  //line that is required to infialize passport
  app.use(passport.initialize());

  //If your application uses persistent login sessions, passport.
  //session() middleware must also be used.
  app.use(passport.session());

  // Serve the client files
  // app.use('/', express.static('../client/public'));

  //handles the login request from the home page
  app.use('/Server/auth/', authRouter);

  //injects passport into the authController
  //which enables for facebook auth
  require('../auth/authController.js')(passport);
  
  //injects authRouter into the authRoutes which will
  //be able to handle the routes
  require('../auth/authRoutes.js')(authRouter);
};
