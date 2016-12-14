const userRouter = require('express').Router();
const mathController = require('./mathController.js');

userRouter.get('/Arena', mathController.generateQuestion);
// userRouter.get('/Arena', mathController.checkAnswer);