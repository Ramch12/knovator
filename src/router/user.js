const { Router } = require('express');

const { createUser, signInUser, getUser, getUsers, updateUser, deleteUser } = require('../controller/user.js');
const { authToken } = require('../middleware/auth.js')

const userRoute = Router();
userRoute.post('/create-user', createUser);
userRoute.post('/login-user', signInUser);
userRoute.get('/get-user/:_id', [authToken, getUser]);
userRoute.get('/get-users', [authToken, getUsers]);
userRoute.put('/update-user/:_id', [authToken, updateUser]);
userRoute.delete('/delete-user/:_id', [authToken, deleteUser]);

exports.userRoute = userRoute;



