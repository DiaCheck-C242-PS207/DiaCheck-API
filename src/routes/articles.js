const express = require('express');
const articlesController = require('../controller/articles');
const router = express.Router();
const upload = require('../config/upload');
const checkAdmin = require('../middleware/auth');



// Rute untuk mendapatkan semua Artikel
router.get('/getAll/', articlesController.getAllarticles);

// Rute untuk mendapatkan Artikel berdasarkan kategori
router.get('/:title', articlesController.getarticlesByTitle);

// Rute untuk mendapatkan Artikel berdasarkan ID
router.get('/getArticles/:idarticles', articlesController.getarticlesById);

// Rute untuk membuat Artikel
router.post('/create',checkAdmin,upload.single('thumbnail'), articlesController.createArticles);

// Rute untuk menghapus Artikel
router.delete('/delete/:idarticles', articlesController.deletearticlesById);

router.post('/update/:idarticles',checkAdmin,upload.single('thumbnail'),articlesController.updateArticles);
module.exports = router;
