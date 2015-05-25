var express = require('express');
var parser = require('body-parser');
var path = require('path');


// to add modularity later
// var router = require('./routes.js')

var app = express();

app.set('port', process.env.PORT || 3000);

// static router for now
app.use('/', express.static(path.join(__dirname, '/../client/public/')));

app.use(parser.json());
// app.use(parser.urlencoded({extend: true}));

// get and post requests to database


// start server
app.listen(app.get('port'), function () {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});