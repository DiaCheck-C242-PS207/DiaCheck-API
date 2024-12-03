const express = require('express');
const router = express.Router();
const userController = require('../controller/histories'); 


// Rute untuk mendapatkan history berdasarkan ID user
router.get('/:idUser', userController.getHistoriesByUser);

// Rute untuk menghapus history berdasarkan ID history
router.delete('/:idHistories', userController.deleteHistories);

// Rute untuk membuat history
router.post('/create', userController.createHistory);

module.exports = router;