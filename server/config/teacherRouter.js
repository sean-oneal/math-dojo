var teacherRouter = require('express').Router();
var teacherController = require('./../controllers/teacherController.js');

teacherRouter.get('/login', teacherController.loginTeacher );
teacherRouter.get('/teacherdashboard', teacherController.loginTeacher );
// teacherRouter.post('/login', teacherController.loginTeacher); //Local Storage Route
teacherRouter.post('/signup', teacherController.createTeacher);
teacherRouter.post('/logout', teacherController.logoutTeacher);
teacherRouter.post('/student', teacherController.addStudent);
teacherRouter.post('/getstudent', teacherController.getStudent);

module.exports = teacherRouter;
