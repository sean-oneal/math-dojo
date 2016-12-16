var morgan = require('morgan');
var bodyParser = require('body-parser');
var Router = require('./routes.js');
var teacherRouter = require('./teacherRouter.js');
var studentRouter = require('./studentRouter.js');
var classroomRouter = require('./classroomRouter.js');
var userRouter = require('./routes.js');
var mathRouter = require('../mathApi/mathRouter.js'); // Added router for mathApi, route for mathRouter
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
  app.use('/student', studentRouter);
  app.use('/teacher', teacherRouter);
  app.use('/classrooms', classroomRouter);
  app.use('/user', userRouter);
  app.use('/mathApi', mathRouter); // Math route
  app.use(express.static(__dirname + '/../../client'));
};
