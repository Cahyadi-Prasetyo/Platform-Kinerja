# DEPLOYMENT & OPS RUNBOOK

### 1. Infrastructure Target
* **Frontend & Edge:** Vercel atau Netlify untuk memastikan static assets berada sedekat mungkin dengan pengguna lewat Edge Network.
* **Database:** Supabase dengan fitur pooling (Supavisor) diaktifkan untuk menangani lonjakan request data monitoring secara real-time.

### 2. Optimization Pipeline (Build Time)
* **Asset Optimization:** Kompresi otomatis SVG ikon dan penggunaan modern image formats (AVIF/WebP) jika ada avatar tim.
* **Bundle Splitting:** Pastikan komponen Command Menu yang berat dimuat secara dinamis (`next/dynamic`) hanya saat user menekan `Cmd+K` untuk menghemat *initial bundle size*.