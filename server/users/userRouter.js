var userRouter = require('express').Router();
var userController = require('./userController.js');

userRouter.post('/login', userController.loginUser);
userRouter.post('/signup', userController.createUser);
userRouter.get('/logout', userController.logoutUser);


module.exports = userRouter;