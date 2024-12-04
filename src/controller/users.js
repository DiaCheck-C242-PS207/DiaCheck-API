const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const dbPool = require('../config/database');
const jwt = require('jsonwebtoken');

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
    try {
        const { email, password } = req.body;  // Mengambil email dan password dari body request

        // Cek jika email atau password tidak ada
        if (!email || !password) {
            return res.status(400).json({ message: 'Email dan password harus diisi!' });
        }

        // Mengambil pengguna berdasarkan email
        const user = await userModel.getUserByEmail(email);

        // Cek jika pengguna tidak ditemukan
        if (!user) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan!' });
        }

        // Validasi password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Password salah!' });
        }

        // Buat payload untuk JWT
        const payload = {
            id_users: user.id_users,
            roles: user.roles,
        };

        // Buat token JWT
        const token = jwt.sign(payload, process.env.JWT_SECRET || 'defaultsecret', { expiresIn: '1h' });

        // Kirim token ke klien
        res.status(200).json({
            message: 'Login berhasil!',
            token: `Bearer ${token}`, // Kirim token dengan format "Bearer <token>"
            users: {
                id: user.id_users,
                name: user.name,
                email: user.email,
                roles: user.roles,
                avatar: user.avatar || null
            }
        });
      
    } catch (error) {
        console.error('Error saat proses login:', error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server!' });
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
    const idUser = req.params.idUser;
    const body = req.body;
    const file = req.file;

    if (!body.name && !body.email && !body.password && !file) {
        return res.status(400).json({
            message: 'Harap isi setidaknya satu data yang ingin diubah.'
        });
    }

    try {
        if (file) {
            body.avatar = file.filename;
        }

        await userModel.updateUser(body, idUser);

        res.status(200).json({
            message: 'User berhasil diperbarui',
            data: body
        });
    } catch (error) {
        console.error('Error saat mengupdate user:', error); // Tambahkan log ini
        res.status(500).json({
            message: 'Terjadi kesalahan pada server.',
            serverMessage: error.message
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
