const express = require('express');
const articleController = require('../controller/article');
const router = express.Router();


// Rute untuk mendapatkan semua Artikel
router.get('/getAll', articleController.getAllArticles);

// Rute untuk mendapatkan Artikel berdasarkan kategori
router.get('/article/:title', articleController.getArticlesByTitle);

// Rute untuk mendapatkan Artikel berdasarkan ID
router.get('/:idArticle', articleController.getArticleById);

// Rute untuk membuat Artikel
router.post('/create', articleController.createArticle);

// Rute untuk menghapus Artikel
router.delete('/:idArticle', articleController.getArticleById);
module.exports = router;
