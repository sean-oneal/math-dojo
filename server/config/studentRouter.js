var studentRouter = require('express').Router();
var studentController = require('./../controllers/studentController.js');

studentRouter.get('/login', studentController.loginStudent );
studentRouter.post('/login', studentController.loginStudent);
studentRouter.post('/logout', studentController.logoutStudent);
studentRouter.get('/question' ,studentController.generateQuestion);
studentRouter.get('/classrooms', studentController.getClassrooms);

module.exports = studentRouter;
