## Biasakan membuat setting lokal vscode dengan cara

1. create folder .vscode
2. create file settings.json
3. setting font family, font size, font ligatures, tab size, color theme, prettier tab width, dll

## Create API using framework Express JS

1. pnpm init
2. pnpm i express
3. buat file index.js
4. running app dengan cara node index.js
5. pnpm i nodemon
6. buat script pada packages.json untuk running app, nodemon index.js
7. pnpm i mysql2
8. buat folder db, buat file index.js
9. pnpm i dotenv
10. buat file .env isi dengan credential db dan setting PORT app
11. buat middleware logger
12. buat struktur folder konsep MVC (Model, View, Controller)
13. pnpm i cors (izinkan request lintas domain, agar ketika fe send req ke be yang berbeda port tidak diblok oleh browser)
14. pnpm i express-validator
15. pnpm i module-alias (mengatasi lokasi folder terlalu dalam biar pakai @namafolder)
16. pnpm i jsonwebtoken bcryptjs

## Folder Structure

-   controllers: business logic
-   db: credential database
-   helpers: create function pembantu (format date, format number, dll)
-   middleware: middleware (validator, auth, logger, dll)
-   models: interaksi ke database
-   routes: create endpoint http & set middleware validator
-   validators: definisikan data input (field & rule)
-   views: menampilkan ui

### Alur Singkat

1. `routes/` menerima request →
2. Jalankan `validators/` atau `middleware/` →
3. Jika valid, lanjut ke `controllers/` →
4. Controller memanggil `models/` →
5. `models/` berinteraksi dengan database (`db/`).

## Fitur umum yang perlu ada saat Build App

1. Authentication (JWT, bcrypt)
2. API Documentation (swagger)
3. CORS
4. Error Handler Global
5. Validation Modular
6. Request Logger
7. Monitoring (optional)

## Notes

require() adalah CommonJS (default nodejs)
import itu ESM (Ecma Script Module)
Jika ingin pakai import, aktifkan mode ESM dengan "type": "module" di packages.json

Promise dan Callback adalah dua cara untuk menangani proses asynchronous (proses yang tidak langsung menghasilkan output)
contoh: query db, baca file, call API

CALLBACK: Fungsi yang dikirim sebagai parameter, dan akan dipanggil setelah operasi selesai

PROMISE: Objek yang merepresentasikan status dari proses async
Pending -> Fullfilled / resolved (sukses) atau Rejected (gagal)
Bisa ditangani dengan then().catch()
Atau lebih baik: async & await + try & catch
