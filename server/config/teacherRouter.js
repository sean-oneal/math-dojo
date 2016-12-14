var teacherRouter = require('express').Router();
var teacherController = require('./../controllers/teacherController.js');

teacherRouter.post('/login', teacherController.loginTeacher);
teacherRouter.post('/signup', teacherController.createTeacher);
teacherRouter.get('/logout', teacherController.logoutTeacher);
teacherRouter.post('/student', teacherController.addStudent); //Add a student

module.exports = teacherRouter;
