const dbPool = require('../config/database');

// Mengambil semua artikel
const getAllArticles = () => {
    const sqlQuery = 'SELECT * FROM articles ORDER BY created_at DESC';
    return dbPool.execute(sqlQuery);
};

// Mengambil artikel berdasarkan kategori
const getArticlesByCategory = (title) => {
    const sqlQuery = 'SELECT * FROM articles WHERE title = ? ORDER BY created_at DESC';
    return dbPool.execute(sqlQuery, [title]);
};

// Mengambil artikel berdasarkan ID
const getArticleById = (idArticle) => {
    const sqlQuery = 'SELECT * FROM articles WHERE id_article = ?';
    return dbPool.execute(sqlQuery, [idArticle]);
};
// Fungsi untuk membuat artikel baru
const createArticle = (articleData) => {
    const { thumbnail, title, body } = articleData;
    const sqlQuery = `INSERT INTO articles (thumbnail, title, body, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())`;
    return dbPool.execute(sqlQuery, [thumbnail,title, body]);
};

// Fungsi untuk menghapus artikel berdasarkan ID
const deleteArticleById = (idArticle) => {
    const sqlQuery = `DELETE FROM articles WHERE id_article = ?`;
    return dbPool.execute(sqlQuery, [idArticle]);
};

module.exports = {
    getAllArticles,
    getArticlesByCategory,
    getArticleById,
    createArticle,
    deleteArticleById,
};
