const dbPool = require('../config/database');

//untuk menampilkan semua user
const getAllUser = () =>{
    const sqlQuery = "SELECT * FROM users";
    return dbPool.execute( sqlQuery )
};

//untuk menampilkan user sesuai id
const getUserById = (idUser) => {
    const sqlQuery = `SELECT * FROM users WHERE id = '${idUser}'`;
    
    return dbPool.execute(sqlQuery);
};

// Fungsi untuk mendapatkan pengguna berdasarkan email
const getUserByEmail = async (email) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    return dbPool.execute(query, [email]).then(([rows]) => rows);
};

// Fungsi untuk membuat pengguna baru atau Register
const registerUser = async (userData) => {
    const { name, email, password } = userData;
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    return dbPool.execute(query, [name, email, password]);
};

//untuk mengupdate Users
const updateUser = (body, idUser) =>{
    const sqlQuery = `UPDATE users SET name = '${body.name}', email = '${body.email}', password = '${body.password}', avatar ='${body.avatar}', avatar_google = '${body.avatar_google}' WHERE id = '${idUser}'`;

    return dbPool.execute(sqlQuery);
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
