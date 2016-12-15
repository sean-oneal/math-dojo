var classroomRouter = require('express').Router();
var classroomController = require('./../controllers/classroomController.js');

classroomRouter.get('/', classroomController.getClassrooms);

module.exports = classroomRouter;
