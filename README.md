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
1. Akhmad Nuvi Fadil Rizaldi
2. Hikmal Falah Agung Maulana
3. Wahyu
4. Deny Firmansyach
5. Errie Tri Armawan
6. Aysyah Noor Shobah
7. Hasan Abdu Rahman

