const dbPool = require('../config/database');

//untuk menampilkan semua user
const getAllUser = () =>{
    const sqlQuery = "SELECT * FROM users";
    return dbPool.execute( sqlQuery )
};

//untuk menampilkan user sesuai id
const getUserById = (idUser) => {
    const sqlQuery = `SELECT * FROM users WHERE id_users = '${idUser}'`;
    
    return dbPool.execute(sqlQuery);
};

// Fungsi untuk mendapatkan pengguna berdasarkan email
const getUserByEmail = async (email) => {
    try {
        const query = 'SELECT * FROM users WHERE email = ?';
        const [users] = await dbPool.execute(query, [email]);  // Pastikan email adalah string
        return users[0];  
    } catch (error) {
        return rows.length > 0 ? rows : [];
    }
};
// Fungsi untuk membuat pengguna baru atau Register
const registerUser = async (userData) => {
    const { name, email, password } = userData;
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    return dbPool.execute(query, [name, email, password]);
};

//untuk mengupdate Users
const updateUser = async (body, idUser) => {
    // Buat array untuk menyimpan kolom yang akan diperbarui
    let fieldsToUpdate = [];

    if (body.name) {
        fieldsToUpdate.push(`name = '${body.name}'`);
    }
    if (body.email) {
        fieldsToUpdate.push(`email = '${body.email}'`);
    }
    if (body.password) {
        fieldsToUpdate.push(`password = '${body.password}'`);
    }
    if (body.avatar) {
        fieldsToUpdate.push(`avatar = '${body.avatar}'`);
    }

    // Jika tidak ada kolom yang diperbarui, kembalikan error
    if (fieldsToUpdate.length === 0) {
        throw new Error('Tidak ada data yang diupdate.');
    }

    // Gabungkan field yang akan diupdate menjadi satu string
    const sqlQuery = `
        UPDATE users 
        SET ${fieldsToUpdate.join(', ')}
        WHERE id_users = ?;
    `;

    // Eksekusi query ke database
    return dbPool.execute(sqlQuery, [idUser]);
};

//untuk menghapus Users
const deleteUser = (idUser) => {
    const sqlQuery =  `DELETE FROM users WHERE id_users = '${idUser}'`;

    return dbPool.execute(sqlQuery);
};



module.exports={
    getAllUser,
    getUserById,
    registerUser,
    updateUser,
    deleteUser,
    getUserByEmail,
};
