var userRouter = require('express').Router();
var userController = require('./userController.js');

userRouter.post('/login', userController.loginUser);
userRouter.post('/signup', userController.createUser);
userRouter.get('/logout', userController.logoutUser);
userRouter.get('/api', userController.retrieveAll);
userRouter.get('/:username', userController.retrieveUser);
userRouter.put('/:username', userController.updateUser);
userRouter.delete('/:username', userController.deleteUser);

module.exports = userRouter;