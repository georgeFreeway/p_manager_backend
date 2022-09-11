const express = require('express');
const controllers = require('../controllers/userControllers');

//init user router
const userRouter = express.Router();

//routes
userRouter.get('/getallusers', controllers.getAllUsers)
userRouter.post('/signup', controllers.signup);
userRouter.post('/login', controllers.login);

module.exports = userRouter;
