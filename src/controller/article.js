const articleModel = require('../models/article');

// Mendapatkan semua artikel
const getAllArticles = async (req, res) => {
    try {
        const [articles] = await articleModel.getAllArticles();
        res.status(200).json({
            message: 'Berhasil mengambil semua artikel',
            data: articles,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            serverMessage: error.message,
        });
    }
};

// Mendapatkan artikel berdasarkan kategori
const getArticlesByTitle = async (req, res) => {
    const { title } = req.params;
    try {
        const [articles] = await articleModel.getArticlesByTitle(title);
        res.status(200).json({
            message: `artikel dengan judul ${title}`,
            data: articles,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            serverMessage: error.message,
        });
    }
};

// Mendapatkan artikel berdasarkan ID
const getArticleById = async (req, res) => {
    const { idArticle } = req.params;
    try {
        const [article] = await articleModel.getArticleById(idArticle);
        if (article.length === 0) {
            return res.status(404).json({
                message: 'Artikel tidak ditemukan',
                data: null,
            });
        }
        res.status(200).json({
            message: 'Berhasil mengambil artikel',
            data: article[0],
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            serverMessage: error.message,
        });
    }
};

// Fungsi untuk membuat artikel baru
const createArticle = async (req, res) => {
    const { thumbnail,title, body, } = req.body;

    // Validasi data input
    if (!thumbnail || !title || !body) {
        return res.status(400).json({
            message: 'Harap isi semua data artikel dengan lengkap.',
            data: null,
        });
    }

    try {
        await articleModel.createArticle({ thumbnail, title, body });
        res.status(201).json({
            message: 'Artikel berhasil dibuat.',
            data: { thumbnail, title, body },
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            serverMessage: error.message,
        });
    }
};

// Fungsi untuk menghapus artikel berdasarkan ID
const deleteArticleById = async (req, res) => {
    const { idArticle } = req.params;

      // Verifikasi apakah pengguna adalah admin
    //   const userRole = req.user.role; // Asumsi bahwa role sudah ada pada objek `user`

    //   if (userRole !== 'admin') {
    //       return res.status(403).json({
    //           message: 'Hanya admin yang bisa menghapus artikel.',
    //       });
    //   }

    try {
        const [result] = await articleModel.deleteArticleById(idArticle);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Artikel tidak ditemukan.',
                data: null,
            });
        }

        res.status(200).json({
            message: 'Artikel berhasil dihapus.',
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            serverMessage: error.message,
        });
    }
};

module.exports = {
    getAllArticles,
    getArticlesByTitle,
    getArticleById,
    createArticle,
    deleteArticleById,
};
