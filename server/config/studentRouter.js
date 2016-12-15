var studentRouter = require('express').Router();
var studentController = require('./../controllers/studentController.js');

studentRouter.post('/login', studentController.loginStudent);
studentRouter.post('/logout', studentController.logoutStudent);

module.exports = studentRouter;
