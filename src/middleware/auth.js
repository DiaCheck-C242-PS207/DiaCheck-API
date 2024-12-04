const jwt = require('jsonwebtoken');

const checkAdmin = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).json({ message: 'Authorization header tidak ditemukan.' });
        }

        const token = authHeader.split(' ')[1]; // Mengambil token setelah "Bearer"
        console.log('Token diterima:', token); // Log token yang diterima

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded payload:', decoded); // Log decoded payload

        if (decoded.roles !== 'admin') {  // Periksa jika role bukan admin
            return res.status(403).json({ message: 'Akses ditolak, hanya admin yang dapat melakukan operasi ini' });
        }

        req.user = decoded; // Menyimpan data pengguna yang terdecode di req
        next();
    } catch (error) {
        console.error('Error saat memverifikasi token:', error); // Log error
        res.status(403).json({ message: 'Akses ditolak.' });
    }
};

module.exports = checkAdmin;

