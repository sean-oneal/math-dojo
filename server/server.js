var express = require('express');
var mongoose = require('mongoose');
var app = express();

mongoose.connect('mongodb://localhost/catFight');

var port = 3000;

require('./config/middleware.js')(app,express);

app.listen(port, function() {
  console.log('Now listening on port', port);
});

module.exports = app;