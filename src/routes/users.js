const express = require('express');
const router = express.Router();
const userController = require('../controller/users'); 


//Register user
router.post('/register', userController.registerUser);

//Login
router.post('/login', userController.loginUser);

//Read all-User
router.get('/', userController.getAllUser);

//get user By ID
router.get('/:idUser', userController.getUserById);

//Updated 
router.put('/:idUser', userController.updateUser);

//Delete User 
router.delete('/:idUser', userController.deleteUser );

//logout user
router.post('/logout', userController.logoutUser);



module.exports = router;
