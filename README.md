# Monetra

Aplikasi web pencatat keuangan pribadi untuk mahasiswa, dibangun dengan **React 19** dan **Vite 7**.
Catat pemasukan dan pengeluaran harian, pantau saldo, lihat laporan bulanan, dan sisihkan uang untuk
target tabungan, semuanya langsung di browser tanpa akun atau server.

Project ini dibuat untuk **UTS Praktikum POPL A**.

- **GitHub:** https://github.com/Miraaa24/Monetra_KLP_3
- **Docker Hub:** https://hub.docker.com/r/miraa24/monetra

## Tim

| No | Nama | NIM |
| -- | ---- | --- |
| 1 | Almira Sadida | 2408107010004 |
| 2 | Illiza Khairamisa | 2408107010017 |
| 3 | Azira Kania | 2408107010025 |

## Latar Belakang, Tujuan, dan Manfaat

**Latar belakang.** Banyak mahasiswa hidup dengan uang saku terbatas tetapi jarang mencatat
pengeluaran, sehingga uang sering habis sebelum akhir bulan tanpa jelas larinya ke mana.
Aplikasi keuangan yang ada umumnya terlalu rumit dan tidak memakai kategori yang dekat dengan
kehidupan mahasiswa.

**Tujuan.** Menyediakan aplikasi pencatat keuangan yang sederhana, cepat dipakai, dan memakai
kategori yang sesuai kebutuhan mahasiswa (makan, kos, transport, kuliah).

**Manfaat.**
- Pengguna tahu ke mana uangnya pergi lewat riwayat transaksi dan laporan bulanan.
- Pengguna terbantu menabung untuk target tertentu (laptop, liburan, dan sebagainya).
- Pengguna diingatkan mencatat bila hari ini belum ada catatan.

**Target pengguna.** Mahasiswa yang ingin mengatur uang saku, pemasukan sampingan (freelance,
beasiswa), dan tabungan tanpa harus membuat akun.

## Fitur

- **Dashboard**: ringkasan saldo, total pemasukan, total pengeluaran, 5 transaksi terbaru, kalender mini, dan catatan target.
- **Pencatatan transaksi**: tambah, ubah, dan hapus transaksi (dengan dialog konfirmasi). Setiap transaksi punya keterangan, nominal, kategori, dan tanggal, dengan validasi input.
- **Kategori khas mahasiswa**:
  - Pengeluaran: Makan, Transport, Kos, Kuliah, Hiburan, Belanja, Lainnya.
  - Pemasukan: Uang saku, Freelance, Beasiswa, Lainnya.
- **Daftar transaksi**: dikelompokkan per hari beserta total harian, dengan filter kata kunci, jenis, kategori, dan rentang tanggal.
- **Laporan bulanan**: pilih bulan untuk melihat saldo, perbandingan pemasukan vs pengeluaran, dan rincian pengeluaran per kategori.
- **Catatan target (wishlist tabungan)**: buat target seperti laptop atau liburan, lalu alokasikan dana dari saldo bebas. Alokasi dibatasi oleh saldo bebas dan sisa target.
- **Kalender mini**: menandai hari yang sudah punya catatan.
- **Pengingat harian**: banner muncul jika belum ada transaksi hari ini.
- **Penyimpanan lokal**: data tersimpan otomatis di `localStorage` browser.

## Teknologi

| Bagian | Teknologi |
| ------ | --------- |
| Bahasa | JavaScript (JSX, ES Modules) |
| UI | React 19 |
| Build tool | Vite 7 + `@vitejs/plugin-react` |
| Penyimpanan | `localStorage` |
| Styling | CSS biasa (`src/index.css`) |
| Font | Cormorant Garamond dan DM Sans (Google Fonts) |
| Kontainerisasi | Docker |

## Cara Menjalankan

```bash
git clone https://github.com/Miraaa24/Monetra_KLP_3
cd Monetra_KLP_3
```

Prasyarat: [Node.js](https://nodejs.org/) 20.19+ (atau 22.12+), sesuai syarat Vite 7, dan npm.

```bash
npm install
npm run dev
```

Buka http://localhost:5173/

| Perintah | Fungsi |
| -------- | ------ |
| `npm run dev` | Server pengembangan dengan hot reload |
| `npm run build` | Build produksi ke folder `dist/` |
| `npm run preview` | Menjalankan hasil build secara lokal |

## Docker

**Docker Hub (public):** https://hub.docker.com/r/miraa24/monetra

Jalankan dari image yang sudah dipublikasikan:

```bash
docker pull miraa24/monetra:v1-UTS
docker run -p 8080:80 miraa24/monetra:v1-UTS
```

Build dan push sendiri (tag wajib berakhiran `-UTS`):

```bash
docker build -t miraa24/monetra:v1-UTS .
docker push miraa24/monetra:v1-UTS
```

`.dockerignore` mengecualikan `node_modules`, `dist`, dan `.git` agar image lebih kecil.

## Struktur Proyek

```text
.
├── dockerfile
├── nginx.conf
├── .dockerignore
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── vite.svg
└── src/
    ├── main.jsx              # Titik masuk aplikasi
    ├── App.jsx               # Navigasi tab, form transaksi, dialog hapus
    ├── index.css             # Seluruh gaya aplikasi
    ├── pages/
    │   ├── Dashboard.jsx     # Ringkasan, target, transaksi terbaru, kalender
    │   ├── Transactions.jsx  # Daftar transaksi + filter
    │   └── Reports.jsx       # Laporan bulanan
    ├── components/
    │   ├── SummaryCards.jsx      # Kartu saldo / pemasukan / pengeluaran
    │   ├── TransactionForm.jsx   # Form tambah & ubah transaksi
    │   ├── TransactionList.jsx   # Daftar transaksi per hari
    │   ├── GoalNotes.jsx         # Catatan target tabungan
    │   ├── MiniCalendar.jsx      # Kalender mini
    │   ├── ReminderBanner.jsx    # Pengingat mencatat hari ini
    │   ├── ConfirmDialog.jsx     # Dialog konfirmasi hapus
    │   ├── EmptyState.jsx        # Tampilan saat data kosong
    │   └── Mascot.jsx            # Maskot (SVG)
    ├── hooks/
    │   ├── useLocalStorage.js    # State yang tersinkron ke localStorage
    │   ├── useTransactions.js    # Logika data transaksi + total
    │   └── useGoals.js           # Logika target tabungan
    └── utils/
        ├── categories.js         # Daftar kategori, ikon, dan warna
        └── format.js             # Format rupiah, tanggal, dan pembuat id
```

## Design Pattern

### 1. Hooks Pattern

Logika data dipisahkan dari tampilan dan dibungkus dalam custom hook, sehingga komponen hanya
memanggil hook dan memakai hasilnya.

- `useTransactions` (`src/hooks/useTransactions.js`): menyediakan `transactions`, `totals`, `addTransaction`,
  `updateTransaction`, dan `deleteTransaction`. Total dihitung dengan `useMemo`.
- `useGoals` (`src/hooks/useGoals.js`): menyediakan `goals`, `totalSaved`, `addGoal`, `removeGoal`, dan `allocate`.
- `useLocalStorage` (`src/hooks/useLocalStorage.js`): hook generik yang menyinkronkan state dengan `localStorage`,
  dipakai oleh dua hook di atas.

Contoh penerapan di `App.jsx`:

```jsx
const tx = useTransactions()
const goalState = useGoals()
```

### 2. Container-Presenter Pattern

- **Container**: `pages/Transactions.jsx` mengelola state filter (pencarian, jenis, kategori, tanggal)
  lalu menyaring data.
- **Presenter**: `components/TransactionList.jsx` hanya menampilkan data dari props. Komponen ini dipakai ulang
  di Dashboard dan halaman Transaksi.

### 3. Lifting State Up dan Composition

`App.jsx` memegang state bersama (data transaksi, data target, form, dan dialog hapus) lalu meneruskannya ke
halaman dan komponen anak lewat props. `ConfirmDialog` dipakai ulang untuk hapus transaksi dan hapus target.

## Penyimpanan Data

Data disimpan di `localStorage` browser dengan dua kunci:

| Kunci | Isi |
| ----- | --- |
| `monetra:transactions` | Daftar transaksi (`id`, `title`, `type`, `amount`, `category`, `date`) |
| `monetra:goals` | Daftar target tabungan (`id`, `name`, `target`, `saved`) |

Data tidak berpindah antar perangkat atau browser, dan hilang jika data situs dihapus.

## Cara Perhitungan

- **Saldo** = total pemasukan − total pengeluaran.
- **Saldo bebas** = saldo − total dana yang sudah dialokasikan ke target.
- Menghapus target mengembalikan dana yang dialokasikan menjadi saldo bebas.
- Mengubah atau menghapus transaksi otomatis menghitung ulang saldo.

## Manajemen Versi (Git)

**Penamaan branch**

| Jenis | Format | Contoh |
| ----- | ------ | ------ |
| Fitur baru | `feat_{nama_fitur}/{tanggal}` | `feat_catatan-target/14-10-2026` |
| Perbaikan bug | `fix_{nama_fitur}/{tanggal}` | `fix_filter-tanggal/14-10-2026` |

**Pesan commit**

| Prefix | Kegunaan |
| ------ | -------- |
| `feat:` | penambahan atau peningkatan fitur |
| `fix:` | perbaikan bug |
| `style:` | styling UI |
| `chore:` | perubahan non-fungsional (config, dokumentasi, dll.) |

Contoh: `feat: tambah alokasi dana ke catatan target`

## Rencana Pengembangan

- Autentikasi dan backend agar data tersinkron antar perangkat.
- Ekspor laporan ke PDF atau CSV.
- Anggaran bulanan per kategori dengan peringatan saat hampir habis.
- Grafik yang lebih interaktif di halaman Laporan.
- Transaksi berulang (misalnya bayar kos tiap bulan).
- Perbaikan UI/UX dan mode gelap.
- Deployment penuh ke GCP dengan Docker.
