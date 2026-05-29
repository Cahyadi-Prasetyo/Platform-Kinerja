# DESIGN SYSTEM & UI SPECIFICATION (DESIGN.md)
## Project: Team Performance Monitoring Platform (Linear Workspace Light-Mode Variant)

Dokumen ini adalah panduan visual resmi untuk AI Agent dan Frontend Developer. Seluruh komponen wajib mengikuti estetika aplikasi internal (workspace) Linear.app: menggunakan skema off-white, kontras mikro, layout multi-panel, dan elemen berdensitas tinggi.

---

## 1. UI Architecture & Layout Principle

Aplikasi tidak menggunakan halaman web konvensional, melainkan struktur *Productivity App* yang kaku namun efisien:

* **Dual-Surface Contrast:** Latar belakang dasar (*canvas*) menggunakan warna abu-abu sangat muda (off-white). Area kerja utama (tabel, daftar tugas, dashboard) dibungkus dalam kontainer putih bersih dengan border tipis untuk menciptakan kedalaman visual tanpa bayangan (*shadow*).
* **High-Density Layout:** Jarak antar elemen (*padding/margin*) sangat rapat. Informasi dimaksimalkan agar muat dalam satu layar tanpa *scrolling* yang tidak perlu.
* **Frameless Primitives:** Input form dan judul halaman tidak memiliki kotak atau border penutup tradisional. Elemen menggunakan teks polos yang langsung dapat diedit di tempat (*inline editing*).

---

## 2. Design Tokens (Light Mode Palettes)

Gunakan variabel warna di bawah ini (atau padanannya dalam Tailwind CSS Zinc/Slate) untuk membangun UI:

| Token | Nilai Hex | Tailwind Class | Penggunaan Utama |
| :--- | :--- | :--- | :--- |
| `--bg-canvas` | `#f4f4f5` | `bg-zinc-100` | Latar belakang dasar aplikasi & sidebar kiri. |
| `--bg-surface` | `#ffffff` | `bg-white` | Kontainer utama area kerja, modul dashboard, & modal. |
| `--bg-element` | `#eaeaea` | `bg-zinc-200/60` | Efek hover pada baris daftar, button aktif, & dropdown. |
| `--border-default`| `#e4e4e7` | `border-zinc-200`| Garis pemisah komponen (wajib `1px solid`). |
| `--text-primary` | `#18181b` | `text-zinc-900` | Teks utama, judul proyek, skor KPI, nama pegawai. |
| `--text-secondary`| `#71717a` | `text-zinc-500` | Target tanggal, ID metrik (e.g., TIM-1), label menu. |
| `--text-muted` | `#a1a1aa` | `text-zinc-400` | Placeholder input, shortcut hint, ikon non-aktif. |

### Warna Status & Prioritas (Muted Tone)
* **No Priority / Backlog:** `#71717a` (Ikon garis putus-putus)
* **High/Urgent:** `#f87171` (Muted Red)
* **In Progress / Medium:** `#fbbf24` (Muted Amber)
* **Completed / Success:** `#4ade80` (Muted Green)

---

## 3. Component Specifications (Spesifikasi Komponen)

### A. Sidebar Navigasi Kiri (Workspace Navigation)
* **Karakteristik:** Lebar tetap `240px`, background `--bg-canvas`.
* **Struktur Teks:** Nama akun/workspace di paling atas dengan dropdown kecil. Label kategori menggunakan font size `11px` (`text-xs`), bold, warna `--text-secondary` (All-Caps).
* **Menu Item:** Tinggi `28px` hingga `32px`. Efek hover instan mengubah background menjadi `--bg-element` dengan `border-radius: 4px`. Angka notifikasi di sisi kanan menggunakan teks kecil tanpa badge kapsul tebal.

### B. High-Density Row List (Daftar Metrik / Tugas Kinerja)
* **Struktur Baris:** Tinggi baris maksimal `36px` (`py-1.5`).
* **Elemen Horizontal:** [Checkbox/Ikon Status] -> [ID Metrik, e.g., KPI-12] -> [Judul/Nama Tugas] -> [Avatar Kecil] -> [Tanggal Target].
* **Garis Pemisah:** Setiap baris dipisahkan oleh `border-b: 1px solid var(--border-default)`. Baris terakhir menyatu dengan kontainer putih.

### C. Frameless Project/Metric Creator (Form Pembuatan)
* **Title Input:** Teks berukuran `text-xl` atau `text-2xl`, font-weight semi-bold, warna `--text-primary`, tanpa border box (`border-none focus:ring-0`).
* **Metadata Inline Pills:** Di bawah judul, terdapat deretan tombol opsi (*Pills*) untuk konfigurasi cepat (e.g., Assignee, Due Date, Priority).
  * *Styling Pills:* Background `transparent` atau `white`, border `1px solid var(--border-default)`, `border-radius: 9999px` (capsule), tinggi `24px`, font `text-xs`.

### D. Multi-Panel Dashboard (Split-View Workspace)
* **Main Section (Kiri):** Mengambil `70%` hingga `75%` lebar layar. Berisi tabel utama data performa tim.
* **Insight Panel (Kanan):** Mengambil `25%` hingga `30%` lebar layar. Dipisahkan oleh border vertikal `1px`. Berisi ringkasan statis seperti tab "Health" dan "Leads" untuk melihat efisiensi kerja tim secara makro.

### E. Popover / Dropdown Menu
* **Visual:** Latar belakang wajib `--bg-surface` (`bg-white`), radius `rounded-lg` (8px).
* **Shadow:** Menggunakan *micro-shadow* yang sangat tipis agar elemen terlihat sedikit terangkat: `box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.05)`.

---

## 4. Elemen Interaktif & Aturan Teknis Frontend

* **Typography:** Wajib menggunakan font `Geist Sans` atau `Inter` dengan `tracking-tight`. Untuk bagian angka/skor kinerja, wajib menggunakan utility CSS `tabular-nums` agar sejajar secara vertikal.
* **Iconography:** Menggunakan `Lucide React` atau `Radix Icons`. Ukuran dikunci pada `14px` atau `16px`. Ketebalan garis (*stroke width*) wajib `1.5px`.
* **Zero Animation Delay:** Efek hover pada tombol, menu item, dan baris daftar tidak boleh menggunakan durasi animasi yang lambat (`transition-none` atau `duration-75`). Interaksi harus terasa instan dan responsif.