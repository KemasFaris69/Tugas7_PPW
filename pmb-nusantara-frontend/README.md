# PMB Nusantara — Tugas 7

Kemas Faris Rahadiansyah · 103022300040

Aplikasi pengelolaan pendaftar dengan React dan Vite. Fitur **Informasi PMB** mengambil data JSON secara asinkron melalui Fetch API. Aplikasi juga menyediakan form, daftar, pencarian, filter, dan hapus pendaftar.

## Menjalankan aplikasi

Gunakan Node.js 22.12+ atau versi yang kompatibel dengan Vite 8.

```sh
npm ci
npm run dev
```

Buka alamat yang ditampilkan Vite. Jangan membuka index.html langsung melalui file explorer karena JSON diambil melalui HTTP.

Pemeriksaan produksi:

```sh
npm run lint
npm run build
npm run preview
```

## Endpoint dan alasan pemilihan

Endpoint: `GET /data/informasi-pmb.json`.

File sumber: `public/data/informasi-pmb.json`. Vite menyajikan file tersebut sebagai endpoint HTTP di origin aplikasi. Ini merupakan mock API baca-saja, bukan layanan PMB resmi dan bukan backend/database. Data tidak di-import ke komponen: browser benar-benar mengirim request HTTP lewat `fetch()`.

Informasi berkas, verifikasi, dan daftar ulang dipilih karena sesuai dengan tema penerimaan mahasiswa baru. Mock lokal tidak membutuhkan API key atau akun layanan lain dan bisa dijalankan tanpa ketergantungan API publik. Endpoint menggunakan `import.meta.env.BASE_URL` agar mengikuti base path aplikasi.

## Alur loading, success, dan error

Implementasi ada di `src/components/InformasiPMB.jsx`.

- `useEffect()` menjalankan `muatInformasi()` ketika komponen dipasang. `AbortController` membatalkan request ketika komponen dilepas.
- State `status` dimulai dari `loading`; aplikasi menampilkan indikator dan tulisan “Memuat informasi PMB…”.
- `muatInformasi()` menggunakan `await fetch()`, memeriksa `response.ok`, membaca JSON, dan memeriksa struktur datanya. HTTP 4xx/5xx tidak otomatis dianggap gagal oleh fetch, sehingga pemeriksaan `response.ok` diperlukan.
- Jika berhasil, data disimpan ke state `informasi` dan status menjadi `success`. Data dirender menggunakan `informasi.map()` menjadi daftar; setiap item memakai `key={item.id}`. ID pada mock dibuat unik.
- Jika jaringan, status HTTP, JSON, atau struktur data bermasalah, blok `catch` mengubah status menjadi `error` dan menampilkan pesan kegagalan.
- Tombol **Coba Lagi** hanya muncul saat error. Klik tombol mengatur status kembali menjadi `loading`, lalu memanggil `muatInformasi()` untuk mengulang request.
- Respons berupa array kosong ditangani dengan pesan “Belum ada informasi PMB.”

Tidak ada jeda buatan atau sakelar error dalam aplikasi normal. Screenshot loading/error dibuat dengan pengendalian request pada browser pengujian; endpoint asli tetap benar.

## File fitur Informasi PMB

| File | Fungsi |
| --- | --- |
| `src/components/InformasiPMB.jsx` | Fetch asinkron, state, list, dan retry |
| `public/data/informasi-pmb.json` | Tiga informasi contoh PMB |
| `src/App.jsx` | Memasang komponen dan tautan navigasi Informasi PMB; memperjelas footer |

## Pengumpulan

Kumpulkan link repository dan tiga screenshot: loading, success, error. Upload source tanpa `node_modules` dan `dist`. Tangkapan layar tersedia pada folder Screenshot dalam paket tugas.

Catatan: data pendaftar disimpan pada state lokal. Tambah/hapus pendaftar hilang setelah reload; fitur baru hanya mengambil informasi PMB melalui HTTP.
