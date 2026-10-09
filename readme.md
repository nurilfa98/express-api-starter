## Running this App
-   execute query-table.sql
-   setup file .env
-   pnpm i
-   pnpm dev

## Techstack
-   nodejs v16.20
-   pnpm v7.14

## Biasakan membuat setting lokal vscode dengan cara

1. create folder .vscode
2. create file settings.json
3. setting font family, font size, font ligatures, tab size, color theme, prettier tab width, dll

## Create API using framework Express JS

1. pnpm init
2. pnpm i express
3. buat file index.js
4. running app dengan cara node index.js
5. pnpm i nodemon (auto refresh terminal ketika save file)
6. buat script pada packages.json `"dev": "nodemon app.js` untuk running app
7. pnpm i mysql2
8. buat folder config, buat file db.js
9. pnpm i dotenv
10. buat file .env isi dengan credential db dan setting PORT app
11. buat middleware log request, panggil di app.js
12. buat struktur folder src (config, constants, controllers, middlewares, models, routes, schemas, services, utils)
13. pnpm i cors (izinkan request lintas domain, agar ketika fe send req ke be yang berbeda port tidak diblok oleh browser)
14. pnpm i zod (untuk validasi input)
15. pnpm i module-alias (mengatasi lokasi folder terlalu dalam biar pakai @namafolder. setting di file jsconfig & packages.json)
16. pnpm i jsonwebtoken bcryptjs, redis

## Folder Structure

-   config: pengaturan aplikasi & environment variables
-   constants: nilai-nilai tetap (status HTTP, pesan error, role)
-   controllers: penanganan request/response & pengatur alur data
-   middlewares: penyaring request (autentikasi, logger, validasi)
-   models: definisi skema & struktur tabel basis data
-   routes: pemetaan titik akhir (endpoint) HTTP
-   schemas: aturan validasi struktur & tipe data input
-   services: pusat logika bisnis (business logic) & olah data
-   utils: fungsi pembantu umum (format tanggal, hash, JWT)

### Flow Development

1. `routes/` menerima request →
2. Jalankan `middleware auth` → `validasi input`
3. Jika valid, lanjut ke `controllers` →
4. Controller memanggil `services` →
5. Services memanggil `models` →
5. Models berinteraksi dengan database.

## Fitur Existing

-   **Authentication**: Register, Login, dan Logout.
-   **Blacklist Token JWT**


## Notes Learning by doing

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
