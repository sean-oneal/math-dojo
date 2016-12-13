var morgan = require('morgan');
var bodyParser = require('body-parser');
var Router = require('./routes.js');
var cookieParser = require('cookie-parser');
var session = require('express-session');

module.exports = function(app, express) {
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use('/node_modules', express.static(__dirname + '/../../node_modules'));
  app.use('/config', express.static(__dirname + '/../../'));
  app.use(cookieParser());
  app.use(session({secret: '1234567890QWERTY', resave: true,
    saveUninitialized: true}));
  app.use('/user', Router);
  app.use(express.static(__dirname + '/../../src/client'));
};
