const dbPool = require('../config/database');

// Mengambil semua artikel
const getAllarticles = () => {
    const sqlQuery = 'SELECT * FROM articles ORDER BY created_at DESC';
    return dbPool.execute(sqlQuery);
};



// Mengambil artikel berdasarkan ID
const getarticlesById = (idarticles) => {
    const sqlQuery = 'SELECT * FROM articles WHERE id_articles = ?';
    return dbPool.execute(sqlQuery, [idarticles]);
};

//Mencari artikel berdasarkan judul
const getarticlesByTitle = async (title) => {
    try {
        const query = `SELECT DISTINCT id_articles, title, body, thumbnail FROM articles WHERE title LIKE ?`;
        const [rows] = await dbPool.execute(query, [`%${title}%`]);

        return rows;  // Mengembalikan artikel yang memiliki judul yang mirip namun dengan ID yang berbeda
    } catch (error) {
        throw new Error('Terjadi kesalahan saat mengambil artikel: ' + error.message);
    }
};


// Fungsi untuk membuat artikel baru
const createArticles = async (articleData) => {
    try {
        const { title, body, thumbnail, id_users } = articleData;
        
        // Pastikan semua parameter ada sebelum melakukan query ke database
        if (!title || !body || !thumbnail || !id_users) {
            throw new Error('Parameter yang diperlukan tidak lengkap');
        }

        // Query untuk memasukkan artikel ke database
        const query = `
            INSERT INTO articles (title, body, thumbnail, id_users)
            VALUES (?, ?, ?, ?)
        `;
        await dbPool.execute(query, [title, body, thumbnail, id_users]);
    } catch (error) {
        throw error;  // Lempar error untuk ditangani di controller
    }
};


//update artikel
const updateArticles = (articleData, idarticles) => {
    const { title, body, thumbnail } = articleData;

    // Pastikan semua field yang diperlukan tidak undefined
    const sqlQuery = `
        UPDATE articles
        SET title = ?, body = ?, updated_at = NOW() ${thumbnail ? ', thumbnail = ?' : ''}
        WHERE id_articles = ?
    `;

    // Menyusun array parameter, memastikan jika thumbnail ada, itu termasuk
    const params = thumbnail ? [title, body, thumbnail, idarticles] : [title, body, idarticles];

    return dbPool.execute(sqlQuery, params);
};




// Fungsi untuk menghapus artikel berdasarkan ID
const deletearticlesById = (idarticles) => {
    const sqlQuery = `DELETE FROM articles WHERE id_articles = ?`;
    return dbPool.execute(sqlQuery, [idarticles]);
};

module.exports = {
    getAllarticles,
    getarticlesByTitle,
    getarticlesById,
    createArticles,
    deletearticlesById,
    updateArticles,
};
