const mathRouter = require('express').Router();
const mathController = require('./mathController.js');

mathRouter.get('/arena', mathController.generateQuestion);
// // userRouter.get('/checkAnswer', mathController.checkAnswer);

module.exports = mathRouter;