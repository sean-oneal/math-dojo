const userRouter = require('express').Router();
const mathController = require('./mathController.js');

userRouter.get('/getQuestion', mathController.generateQuestion);
// userRouter.get('/', mathController.checkAnswer);