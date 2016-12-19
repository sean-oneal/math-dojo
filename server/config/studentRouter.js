const studentRouter = require('express').Router();
const studentController = require('./../controllers/studentController.js');

studentRouter.get('/login', studentController.loginStudent );
studentRouter.post('/login', studentController.loginStudent);
studentRouter.post('/logout', studentController.logoutStudent);
studentRouter.post('/question', studentController.generateQuestion);
studentRouter.get('/classrooms', studentController.getClassrooms);

module.exports = studentRouter;
