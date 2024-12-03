const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const dbPool = require('../config/database');

// Mendapatkan semua pengguna
const getAllUser = async (req, res) => {
    try {
        const [data] = await userModel.getAllUser();
        res.status(200).json({
            message: 'Get all users success',
            data: data,
        });
    } catch (error) {
        console.error('Error fetching users:', error); 
        res.status(500).json({
            message: 'server error',
            serverMessage: error.message,
        });
    }
};

//menampilkan users by ID
const getUserById = async (req, res) => {
    const { idUser } = req.params; 
    try {
        const [rows] = await userModel.getUserById(idUser); 
        res.json({
            message: 'User found by ID',
            data: rows,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            serverMessage: error.message,
        });
    }
};

// Register
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    // Validasi input
    if (!name || !email || !password) {
        return res.status(400).json({
            message: 'Harap isi data dengan benar',
            data: null,
        });
    }

    try {
        // Cek apakah email sudah ada di database
        const [existingUser] = await userModel.getUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({ // 409 Conflict
                message: 'Email sudah digunakan',
                data: null,
            });
        }

        // Hash password sebelum menyimpan ke database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Simpan pengguna baru ke database
        await userModel.registerUser({ name, email, password: hashedPassword });

        res.status(201).json({
            message: 'Menambahkan user baru sukses',
            data: { name, email },
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            serverMessage: error.message,
        });
    }
};

//Login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Validasi input
    if (!email || !password) {
        return res.status(400).json({
            message: 'Email dan password harus diisi',
        });
    }

    try {
        // Query untuk mendapatkan user berdasarkan email
        const [rows] = await dbPool.execute('SELECT * FROM users WHERE email = ?', [email]);

        if (rows.length === 0) {
            return res.status(404).json({
                message: 'User tidak ditemukan',
            });
        }

        const user = rows[0];

        // Bandingkan password yang diinput dengan password yang di-hash di database
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: 'Password salah',
            });
        }

        res.json({
            message: 'Login berhasil',
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            serverMessage: error.message,
        });
    }
};

const logoutUser = (req, res) => {
    try {
        req.session = null;

        // Jika menggunakan JWT di client-side, cukup beritahu pengguna berhasil logout
        res.status(200).json({
            message: 'Logout berhasil',
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            serverMessage: error.message,
        });
    }
};

// update user
const updateUser = async (req, res) => {
    const {idUser} = req.params;
    const {body} = req;
    try {
        await userModel.updateUser(body, idUser);
        res.json ({
            message : 'update berhasil',
            data : {
                id : idUser,
                ...body},
    
        })
    } catch (error) {
        res.status(500).json({
            message: 'server error',
            serverMessage: error.message, 
        });
    }
};

//Delete User
const deleteUser = async (req, res) => {
    const{idUser} = req.params;
    try {
        await userModel.deleteUser(idUser);
        res.json({
            message : 'delete user berhasil',
            data : null
        })
    } catch (error) {
        res.status(500).json({
            message: 'server error',
            serverMessage: error.message, 
        });
    };
    
};

module.exports = {
    getAllUser,
    getUserById,
    registerUser,
    updateUser,
    deleteUser,
    loginUser,
    logoutUser,
};
