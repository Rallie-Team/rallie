// used for logging incoming request
var morgan = require('morgan');
var allowCors = require('./cors.js');
var bodyParser = require('body-parser');
//ensures all requests are stored in the body.

module.exports = function (app, express, passport) {

  var authRouter = express.Router();

    //logs all requests
  app.use(morgan('dev'));

  //takes the data from the url and puts it into the body
  app.use(bodyParser.urlencoded({extended: true}));

  //ensures that all responses be stored in the body and only parses JSON data
  app.use(bodyParser.json());

  app.use(passport.initialize());
  app.use(passport.session());

  // Serve the client files
  app.use('/', express.static('../client/public'));

  app.use('/Server/auth/', authRouter);

  require('../auth/authController.js')(passport);
  require('../auth/authRoutes.js')(authRouter);

};