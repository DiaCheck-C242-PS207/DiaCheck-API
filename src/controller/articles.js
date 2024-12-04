const articlesModel = require('../models/articles');
const jwt = require ('jsonwebtoken');


// Mendapatkan semua artikel
const getAllarticles = async (req, res) => {
    try {
        const [articles] = await articlesModel.getAllarticles();
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
const getarticlesByTitle = async (req, res) => {
    const { title } = req.params;
    try {
        const [articles] = await articlesModel.getarticlesByTitle(title);
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
const getarticlesById = async (req, res) => {
    const { idarticles } = req.params;
    try {
        const [articles] = await articlesModel.getarticlesById(idarticles);
        if (articles.length === 0) {
            return res.status(404).json({
                message: 'Artikel tidak ditemukan',
                data: null,
            });
        }
        res.status(200).json({
            message: 'Berhasil mengambil artikel',
            data: articles[0],
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            serverMessage: error.message,
        });
    }
};

// Fungsi untuk membuat artikel baru
const createArticles = async (req, res) => {
    try {
        const { title, body } = req.body;
        const thumbnail = req.file; 

        // Log data yang diterima
        console.log('Data yang diterima:', { title, body, thumbnail });

        // Validasi jika field kosong
        if (!title || !body || !thumbnail) {
            return res.status(400).json({ message: 'Title, body, dan thumbnail harus diisi!' });
        }

        // Mendapatkan token JWT dari header Authorization
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Token tidak ditemukan atau tidak valid!' });
        }

       // Mendekode token JWT
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'defaultsecret');

        // Log isi token untuk memeriksa struktur
        console.log('Decoded Token:', decoded);

        // Mengambil ID dan role pengguna dari token
        const { id_users, roles } = decoded;

        // Log ID dan roles dari token
        console.log('ID Pengguna:', id_users, 'Roles Pengguna:', roles);

        // Cek jika pengguna bukan admin
        if (roles !== 'admin') {
            return res.status(403).json({ message: 'Akses ditolak, hanya admin yang dapat membuat artikel!' });
        }

        // Memasukkan artikel ke database
        const articleData = {
            title,
            body,
            thumbnail: thumbnail.path,  
            id_users: id_users,
        };

        console.log('Data artikel yang akan disimpan:', articleData);

        const newArticles = await articlesModel.createArticles(articleData);

        res.status(201).json({ 
            message: 'Artikel berhasil dibuat!',
            article: newArticles,
         });
    } catch (error) {
        console.error('Error saat membuat artikel:', error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server.', serverMessage: error.message });
    }
};

//Update Articles
const updateArticles = async (req, res) => {
    const idarticles = req.params.idarticles;
    const body = req.body;
    const file = req.file;

    // Cek jika tidak ada data yang ingin diperbarui
    if (!body.title && !body.body && !file) {
        return res.status(400).json({
            message: 'Harap isi setidaknya satu data yang ingin diubah.'
        });
    }

    try {
        // Cek apakah ada file thumbnail dan tambahkan path file jika ada
        if (file) {
            body.thumbnail = file.filename;
        }

        // Pastikan body tidak mengandung undefined atau nilai yang tidak diinginkan
        // Set nilai default untuk field yang tidak ada
        body.title = body.title || null;
        body.body = body.body || null;
        body.thumbnail = body.thumbnail || null;

        // Panggil model untuk melakukan pembaruan artikel
        await articlesModel.updateArticles(body, idarticles);

        // Kirim response sukses
        res.status(200).json({
            message: 'Artikel berhasil diperbarui',
            data: body
        });
    } catch (error) {
        console.error('Error saat mengupdate artikel:', error);
        res.status(500).json({
            message: 'Terjadi kesalahan pada server.',
            serverMessage: error.message
        });
    }
};



// Fungsi untuk menghapus artikel berdasarkan ID
const deletearticlesById = async (req, res) => {
    const { idarticles } = req.params;

      // Verifikasi apakah pengguna adalah admin
    //   const userRole = req.user.role; // Asumsi bahwa role sudah ada pada objek `user`

    //   if (userRole !== 'admin') {
    //       return res.status(403).json({
    //           message: 'Hanya admin yang bisa menghapus artikel.',
    //       });
    //   }

    try {
        const [result] = await articlesModel.deletearticlesById(idarticles);

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
    getAllarticles,
    getarticlesByTitle,
    getarticlesById,
    createArticles,
    deletearticlesById,
    updateArticles,
};
