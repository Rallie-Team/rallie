var express = require('express');
var parser = require('body-parser');
var passport = require('passport');

var app = express();

app.set('port', process.env.PORT || 3000);

// app.use(parser.urlencoded({extend: true}));
require('./config/middleware.js')(app, express, passport);

// start server
app.listen(app.get('port'), function () {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});