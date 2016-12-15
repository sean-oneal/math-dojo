const mathRouter = require('express').Router();
const mathController = require('./mathController.js');

mathRouter.get('/arena', mathController.generateQuestion);

module.exports = mathRouter;