var morgan = require('morgan');
var bodyParser = require('body-parser');
var Router = require('./routes.js');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

module.exports = function(app, express) {
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(allowCrossDomain);
  app.use('/node_modules', express.static(__dirname + '/../../node_modules'));
  app.use('/config', express.static(__dirname + '/../../'));
  app.use(cookieParser());
  app.use(session({secret: '1234567890QWERTY', resave: true,
    saveUninitialized: true}));
  app.use('/user', Router);
  app.use(express.static(__dirname + '/../../src/client'));
};
