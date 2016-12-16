const morgan = require('morgan');
const bodyParser = require('body-parser');
const teacherRouter = require('./teacherRouter.js');
const studentRouter = require('./studentRouter.js');
const classroomRouter = require('./classroomRouter.js');
const mathRouter = require('../mathApi/mathRouter.js'); // Added router for mathApi, route for mathRouter
const cookieParser = require('cookie-parser');
const session = require('express-session');


const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

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
  app.use('/mathApi', mathRouter); // Math route
  app.use(express.static(__dirname + '/../../client'));
};
