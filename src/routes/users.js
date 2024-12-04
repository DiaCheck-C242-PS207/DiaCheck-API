const express = require('express');
const router = express.Router();
const userController = require('../controller/users'); 
const upload = require('../config/upload');


//Register user
router.post('/register', userController.registerUser);

//Login
router.post('/login', userController.loginUser);

//Read all-User
router.get('/getAllUser', userController.getAllUser);

//get user By ID
router.get('/getUser/:idUser', userController.getUserById);

//Updated 
router.put('/update/:idUser',upload.single('avatar'), userController.updateUser);

//Delete User 
router.delete('/delete/:idUser', userController.deleteUser );

//logout user
router.post('/logout', userController.logoutUser);



module.exports = router;
