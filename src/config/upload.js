const multer = require('multer');
const path = require('path');

// Konfigurasi tempat penyimpanan file dan nama file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Folder tempat menyimpan file
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Format nama file
    }
});

// Filter hanya menerima file gambar (jpeg, jpg, png)
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('File harus berupa gambar (jpeg, jpg, png)'), false);
    }
};

// Inisialisasi multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 2 * 1024 * 1024 // Maksimum ukuran file 2MB
    }
});

module.exports = upload;
