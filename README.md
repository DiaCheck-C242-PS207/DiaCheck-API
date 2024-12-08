# DiaCheck-API

DiaCheck API merupakan sistem backend berbasis Node.js yang dirancang untuk mendukung aplikasi Kesehatan, terutama dalam hal edukasi dan pengecekan diabetes. API ini menyediakan fitur seperti autentikasi pengguna, pengelolaan data Kesehatan, artikel, dan juga Riwayat pengecekan. 

## Fitur Utama

1. Autentikasi dan Otorisasi:
	- Middleware digunakan untuk mengamankan rute dengan 		autentikasi token.
	- Mendukung proses login dan validasi token JWT.
2. Pengelolaan Data Pengguna:
	- CRUD untuk data pengguna, artikel, dan Riwayat pengecekan 	Kesehatan.
3. Penyimpanan File:
	- Mendukung upload file melalui middleware yang disediakan 	oleh Multer.
4. Pengelolaan Database:
	-  Terintegrasi dengan Cloud SQL. 

## Struktur Folder

DiaCheck-API-main/
├── node_modules/         ### Folder untuk dependensi Node.js (otomatis dihasilkan oleh npm)
├── src/                  ### Folder utama untuk kode sumber API
│   ├── config/           ### Konfigurasi aplikasi
│   │   ├── database.js   ### Konfigurasi koneksi ke database
│   │   └── upload.js     ### Konfigurasi untuk proses unggahan file
│   ├── controller/       ### Logika pengelolaan data dan proses bisnis
│   │   ├── articles.js   ### Logika CRUD untuk artikel
│   │   ├── histories.js  ### Logika CRUD untuk riwayat pengecekan
│   │   └── users.js      ### Logika CRUD untuk pengguna
│   ├── middleware/       ### Middleware untuk menangani autentikasi dan proses lainnya
│   │   ├── auth.js       ### Middleware untuk validasi token JWT
│   │   ├── logs.js       ### Middleware untuk mencatat aktivitas API
│   │   └── multer.js     ### Middleware untuk unggahan file
│   ├── models/           ### Struktur dan logika database
│   │   ├── articles.js   ### Model untuk data artikel
│   │   ├── histories.js  ### Model untuk data riwayat pengecekan
│   │   └── users.js      ### Model untuk data pengguna
│   ├── routes/           ### Definisi endpoint API
│   │   ├── articles.js   ### Rute untuk endpoint artikel
│   │   ├── histories.js  ### Rute untuk endpoint riwayat pengecekan
│   │   └── users.js      ### Rute untuk endpoint pengguna
│   └── server.js         ### Entry point aplikasi
├── uploads/              ### Folder untuk menyimpan file yang diunggah
├── .env                  ### File konfigurasi lingkungan (environment variables)
├── .env.example          ### Template file .env sebagai panduan
├── .gitignore            ### Daftar file/folder yang diabaikan oleh Git
├── app.yaml              ### Konfigurasi untuk deploy aplikasi di Google App Engine
├── package.json          ### File konfigurasi npm, termasuk dependensi
├── package-lock.json     ### File lock untuk dependensi
└── README.md             ### Dokumentasi proyek

## Instalasi 

Prasyarat:
1. Pastikan anda telah meinstal GitHub CLI. 
2. Repository anda adalah public atau akun GitHub anda memiliki akses ke repository private. 

Gunakan perintah berikut:

gh repo clone DiaCheck-C242-PS207/DiaCheck-API


Alternatif jika tidak menggunakan GitHub CLI:

Jika anda tidak menggunakan GitHub CLI, anda bisa menggunakan perintah git clone biasa:

git clone https://github.com/DiaCheck-C242-PS207/DiaCheck-API.git 

## Endpoint API

Berikut adalah daftar endpoint Utama:

1. User
	- POST /users/register - Registrasi pengguna baru.
	- POST /users/login - Login pengguna.
	- GET /users/profile - Mendapatkan profil pengguna (dengan autentikasi).

2. Artikel
	- GET /articles - Mendapatkan daftar artikel.
	- POST /articles - Menambahkan artikel baru.
	- PUT /articles/:id - Mengubah artikel berdasarkan ID.
	- DELETE /articles/:id - Menghapus artikel berdasarkan ID.

3. Riwayat
	- GET /histories - Mendapatkan daftar riwayat pengecekan.
	- POST /histories - Menambahkan riwayat baru.
	-PUT /histories/:id - Mengubah riwayat berdasarkan ID.
	-DELETE /histories/:id - Menghapus riwayat berdasarkan ID.

## Credit
Akhmad Nuvi Fadil Rizaldi
Hikmal Falah Agung Maulana
Wahyu
Deny Firmansyach
Errie Tri Armawan
Aysyah Noor Shobah
Hasan Abdu Rahman

